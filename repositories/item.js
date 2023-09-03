import dbPool from "../utils/db.js";

export const getData = (limit) => {
    const sql = "SELECT * FROM items LIMIT ?";
    const values = [limit];
    return dbPool.query(sql, values)
}

export const checkName = (nm) => {
    const sqlChk = "SELECT nm_barang FROM items WHERE ?";
    const values = [nm];
    return dbPool.query(sqlChk, values)
}
export const createData = (nm_barang, hrg_barang, jmlh_barang) => {
    let created_at = new Date();
    const sql = "INSERT INTO items (nm_barang, hrg_barang, jmlh_barang, created_at) VALUE(?, ?, ?, ?)";
    const values = [nm_barang, hrg_barang, jmlh_barang, created_at];
    const result = dbPool.query(sql, values);
    return result;
}

export const updateData = (nm, hrg, jmlh, id) => {
    let upAt = new Date();
    const sqlUp = `UPDATE items SET nm_barang = "${nm}", hrg_barang = "${hrg}", jmlh_barang = "${jmlh}", updated_at = ? WHERE id_barang = "${id}"`;
    const values = [upAt];
    return dbPool.query(sqlUp, values)
}

export const deleteData = (id) => {
    const sql = `DELETE FROM items where id_barang = "${id}"`
    return dbPool.query(sql);
}



export const getDataById = (id) => {
    const sql = `SELECT * FROM items WHERE id_barang = ${id}`;
    return dbPool.query(sql)
}
export const getStatusByBol = (bol) => {
    if (bol == 0){
        const sql = `SELECT id_barang, nm_barang, hrg_barang, jmlh_barang FROM items WHERE jmlh_barang = 0 ORDER BY jmlh_barang ASC`;
        return dbPool.query(sql)
    } else {
        const sql = `SELECT id_barang, nm_barang, hrg_barang, jmlh_barang FROM items WHERE jmlh_barang > 0 ORDER BY jmlh_barang ASC`;
        return dbPool.query(sql)
    }
}
export const getStatusByBol1 = (val) => {
    const sql = `SELECT id_barang, nm_barang, hrg_barang, jmlh_barang FROM items WHERE jmlh_barang >= ${val} ORDER BY jmlh_barang ASC`;
    return dbPool.query(sql)
}
export const getDataByName = (nm) => {
    const sql = `SELECT * FROM items WHERE nm_barang = "${nm}" ORDER BY nm_barang`;
    return dbPool.query(sql)
}
