import cookieParser from "cookie-parser";

import express from "express";

import { PORT } from "./config/env.js";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subcriptionRouter from "./routes/subcription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json()); // permite manejar JSON en las peticiones
app.use(express.urlencoded({ extended: true })); // permite manejar datos de formularios html
app.use(cookieParser()); // permite manejar cookies en las peticiones
// app.use(cors()); // permite manejar CORS, si es necesario
// app.use(compression()); // permite comprimir las respuestas HTTP
// app.use(express.static("public")); // sirve archivos estaticos desde la carpeta public

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subcriptionRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send({body: "hello world"});
});

app.listen(PORT, async () => {
    console.log(`Sub Tracker is running on port http://localhost:${PORT}`);

    await connectToDatabase();
});

export default app;