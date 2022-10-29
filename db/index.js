import pg from "pg";

const pool = new pg.Pool({
    connectionString: process.env.DB_URL,
});

const query = (text, params, callback) => {
    return pool.query(text, params, callback);
};

export default query;
