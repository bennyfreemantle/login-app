import express from "express";
import morgan from "morgan";
import userRouter from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());

app.use("/users", userRouter);

app.listen(PORT, () => {
    console.log(`Running server on http://localhost:${PORT}`);
});
