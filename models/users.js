import query from "../db/index.js";
import validator from "validator";
import argon2 from "argon2";

// ! REMOVE BEFORE PROD - GETS ALL USERS IN DB
// export async function getUsers() {
//   const result = await query(`SELECT * FROM users;`);
//   const users = result.rows;
//   return {
//     success: true,
//     payload: users,
//   };
// }

// Create a new user in our database
export async function createUser(name, email, password) {
    // Validate if name, email and password were all passed
    if (!name || !email || !password) {
        throw Error("All fields must be filled");
    }

    // https://www.npmjs.com/package/validator
    // Validate if the email is an actual email using validator.js
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }

    // Validate if the password is strong enough using validator.js
    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough");
    }

    // query the db for username
    const nameExists = await query(
        `SELECT user_name FROM users WHERE LOWER(user_name) = LOWER($1);`,
        [name]
    );

    // username already exists in our db
    if (nameExists.rows.length >= 1) {
        throw Error("Username has already been taken");
    }

    // query the db for email
    const emailExists = await query(
        `SELECT user_email FROM users WHERE user_email = $1;`,
        [email]
    );

    // email already exists in our db
    if (emailExists.rows.length >= 1) {
        throw Error("Email is already in use by another user");
    }

    // https://www.npmjs.com/package/argon2
    // Hash our password using argon2
    // argon2id already salts our hash for increased security
    let hashedPassword = "";
    try {
        hashedPassword = await argon2.hash(password, {
            type: argon2.argon2id,
        });
        console.log(hashedPassword);
    } catch (error) {
        console.log(error);
    }

    try {
        const user = await query(
            `INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *;`,
            [name, email, hashedPassword]
        );
        return user.rows[0];
    } catch (error) {
        console.log(error);
    }
}
