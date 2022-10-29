import express from "express";
import { createUser } from "../models/users.js";
// import { getUsers } from "../models/users.js";
const userRouter = express.Router();

// ! REMOVE BEFORE PROD - GETS ALL USERS IN DB
// userRouter.get("/", async (req, res) => {
//   const result = await getUsers();
//   console.log(result);
//   res.json(result);
// });

userRouter.post("/", async (req, res) => {
    const { user_name, user_email, user_password } = req.body;
    try {
        const user = await createUser(user_name, user_email, user_password);
        res.status(200).json({
            user,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

export default userRouter;
