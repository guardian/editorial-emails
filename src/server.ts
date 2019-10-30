import compression from "compression";
import express from "express";
import { api } from "./api";
import { Email } from "./email";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(compression());

const salt = process.env.IMAGE_SALT;
if (!salt) {
    throw new Error("Required IMAGE_SALT env var is empty");
}

app.get("/:path", async (req, res) => {
    try {
        const path = req.params.path;
        const front = await api.get(path);

        // Purely for development
        if (req.query.showModel) {
            res.send(front);
            return;
        }

        res.send(Email(front, salt).html);
    } catch (e) {
        res.status(500).send({ error: e.stack });
    }
});

app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).send(`<pre>${err.stack}</pre>`);
});

app.listen(3030);
