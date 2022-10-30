import express from "express";
import jwt from "jsonwebtoken";
import { signUpUser, loginUser } from "../models/users.js";
const userRouter = express.Router();

const createToken = (id) => {
    // Create a jwt that expires in 3 days (allows a user to be logged in automatically for 3 days)
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// * SIGNUP USER
userRouter.post("/signup", async (req, res) => {
    const { user_name, user_email, user_password } = req.body;
    try {
        const user = await signUpUser(user_name, user_email, user_password);
        const token = createToken(user.id);
        res.status(200).json({
            user_email: user.user_email,
            token,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

// * LOGIN USER
userRouter.post("/login", async (req, res) => {
    const { user_email, user_password } = req.body;

    try {
        const user = await loginUser(user_email, user_password);
        const token = createToken(user.id);
        res.status(200).json({
            user_email: user.user_email,
            token,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

export default userRouter;
