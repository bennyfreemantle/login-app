import query from "../db/index.js";
import argon2 from "argon2";

export async function loginUser(email, password) {
    // check email & password have a value
    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    // check if the email exists in our db
    // query the db for email
    const user = await query(`SELECT * FROM users WHERE user_email = $1;`, [
        email,
    ]);

    // email already exists in our db
    if (user.rows.length === 0) {
        throw Error("Invalid login credentials");
    }

    // try to compare the given password to the hashedPassword
    // argon2id decrypt
    const hashedPassword = user.rows[0].user_password;
    let verifiedHash = false;
    try {
        // check if password matches hashed password
        verifiedHash = await argon2.verify(hashedPassword, password);
    } catch (error) {
        return error;
    }
    if (!verifiedHash) {
        throw Error("Invalid login credentials");
    }

    return user.rows[0];
}
