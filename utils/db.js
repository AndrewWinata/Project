import mysql from 'mysql2/promise';

const dbPool = mysql.createPool({
    host:"localhost",
    user:"root",
    password: "ukrida",
    database: "batch_9",
    port: 3307 //default 3306 tidak perlu di ubah bila menggunakan default port
})

export default dbPool;