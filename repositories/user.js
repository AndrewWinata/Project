import dbPool from "../utils/db.js";

export const getData = (limit) => {
    const sql = "SELECT user_id, name_, email_, pwd_, created_at FROM users LIMIT ?";
    const values = [limit];

    return dbPool.query(sql, values)
}
export const getDataById = (id) => {
    const sql = "SELECT user_id, name_, email_, pwd_, created_at FROM users WHERE user_id = ?";
    const values = [id];

    return dbPool.query(sql, values)
}
export const getDataByEmail = (email_) => {
    const sql = "SELECT * FROM users WHERE email_ = ?";
    const values = [email_];

    return dbPool.query(sql, values)
}

export const createData = (name_, email_, pwd_) => {
    let created_at = new Date();
    const sql = "INSERT INTO users (name_, email_, pwd_, created_at) VALUE(?, ?, ?, ?)";
    const values = [name_, email_, pwd_, created_at];
    const result = dbPool.query(sql, values);

    return result;
}

export const updateData = (nm, eml, pswd, id) => {
    const sqlUp = `UPDATE users SET name_ = "${nm}", email_ = "${eml}", pwd_ = "${pswd}" WHERE user_id = "${id}"`;

    return dbPool.query(sqlUp)
}

export const deleteData = (id) => {
    const sql = `DELETE FROM users where user_id = "${id}"`

    return dbPool.query(sql);
}
