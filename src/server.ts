import compression from "compression";
import express from "express";
import asyncHandler from "express-async-handler";
import { api } from "./api";
import { Email } from "./Email";
import { Text } from "./Text";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(compression());

const salt = process.env.IMAGE_SALT;
if (!salt) {
    throw new Error("Required IMAGE_SALT env var is empty");
}

// HTML version as JSON - for Braze/clients
app.get(
    "/:path.json",
    asyncHandler(async (req, res) => {
        const email = await getFront(req.params.path);
        res.send({ json: email });
    })
);

// HTML version - for visual testing
app.get(
    "/:path",
    asyncHandler(async (req, res, next) => {
        const email = await getFront(req.params.path);
        res.send(email);
    })
);

// Text version as JSON - for Braze/clients
app.get(
    "/:path/text.json",
    asyncHandler(async (req, res) => {
        const text = await getTextFront(req.params.path);
        res.send({ json: text });
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

const getFront = async (path: string): Promise<string> => {
    const front = await api.get(path);
    return Email(front, salt);
};

const getTextFront = async (path: string): Promise<string> => {
    const front = await api.get(path);
    return Text(front);
};

app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).send(`<pre>${err.stack}</pre>`);
});

app.listen(3030);
