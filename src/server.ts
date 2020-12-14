import express from "express";
import asyncHandler from "express-async-handler";
import { api } from "./api";
import { Email } from "./Email";
import { Text } from "./Text";
import { getParam } from "./config";
import awsServerlessExpress from "aws-serverless-express";
import { Context } from "aws-lambda";

const app = express();

app.use(express.json({ limit: "50mb" }));

// Prefer env var (as quicker), but otherwise grab from config
const imageSalt: Promise<string> = process.env.IMAGE_SALT
    ? Promise.resolve(process.env.IMAGE_SALT)
    : getParam("/frontend/images.signature-salt");

app.get("/healthcheck", (req, res) => res.send({ status: "okay" }));

// HTML version as JSON - for Braze/clients
app.get(
    "/:path.json",
    asyncHandler(async (req, res) => {
        if (typeof req.query.variant === "string") {
            const email = await getFront(req.params.path, req.query.variant);
            res.send({body: email});
        } else {
            res.send({status: 400, body: "Invalid variant type"});
        }
    })
);

// HTML version - for visual testing
app.get(
    "/:path",
    asyncHandler(async (req, res, next) => {
        if (typeof req.query.variant === "string") {
            if (req.query.showModel) {
                const model = await api.get(req.params.path);
                res.send(model);
                return;
            }
            const email = await getFront(req.params.path, req.query.variant);
            res.send(email);
        } else {
            res.send({status: 400, body: "Invalid variant type"});
        }
    })
);

// Text version as JSON - for Braze/clients
app.get(
    "/:path/text.json",
    asyncHandler(async (req, res) => {
        const text = await getTextFront(req.params.path);
        res.send({ body: text });
    })
);

// Text version - for visual testing
app.get(
    "/:path/text",
    asyncHandler(async (req, res) => {
        const text = await getTextFront(req.params.path);
        res.contentType("text/plain");
        res.send(text);
    })
);

const getFront = async (path: string, variant?: string): Promise<string> => {
    const salt = await imageSalt;
    const front = await api.get(path);
    return Email(front, salt, variant);
};

const getTextFront = async (path: string): Promise<string> => {
    const front = await api.get(path);
    return Text(front);
};

app.use((err: any, req: any, res: any, next: any) => {
    // tslint:disable-next-line: no-console
    console.log(`Error serving response: ${err.stack}`);
    res.status(500).send(`<pre>${err.stack}</pre>`);
});

// If local then don't wrap in serverless
if (process.env.NODE_ENV === "development") {
    app.listen(3030);
} else {
    const server = awsServerlessExpress.createServer(app);
    exports.handler = (event: any, context: Context) => {
        awsServerlessExpress.proxy(server, event, context);
    };
}
