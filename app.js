import express from "express";

import { PORT } from "./config/env.js";

const app = express();

app.get("/", (req, res) => {
    res.send({body: "hello world"});
});

app.listen(PORT, () => {
    console.log(`Sub Tracker is running on port http://${PORT}`);
});

export default app;