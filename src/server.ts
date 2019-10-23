import express from "express";
import compression from "compression";
import { Email } from "./email";
import { api } from "./api";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(compression());

app.get("/:path", async (req, res) => {
    try {
        const path = req.params.path;
        const model = await api.get(path);

        res.send(model);

        //res.send(Email());
    } catch (e) {
        res.status(500).send({ error: e.stack });
    }
});

app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).send(`<pre>${err.stack}</pre>`);
});

app.listen(3030);
