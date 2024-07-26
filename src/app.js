import express from "express";
import cors from "cors";
import authenticationRouter from "./routes/authentication.routes.js";
import userRouter from "./routes/user.routes.js";
import catRouter from "./routes/categories.router.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', authenticationRouter);
app.use('/api', userRouter);
app.use('/api', catRouter);

app.use((req, res) => {
    res.status(404).json("ruta no encontrada");
})

export default app;