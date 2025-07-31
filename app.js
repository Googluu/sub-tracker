import express from "express";

import { PORT } from "./config/env.js";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subcriptionRouter from "./routes/subcription.routes.js";

const app = express();

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subcriptionRouter);

app.get("/", (req, res) => {
    res.send({body: "hello world"});
});

app.listen(PORT, () => {
    console.log(`Sub Tracker is running on port http://localhost:${PORT}`);
});

export default app;