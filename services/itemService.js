import { request, response } from 'express';
import * as ItemRepo from '../repositories/item.js';
import { errorResp, successResp } from '../utils/response.js';

// export const upUser = async (id, nm, eml, pswd) => {
//     //let up_at = new Date();
//     const sqlUp = `UPDATE users SET name_ = "${nm}", email_ = "${eml}", pwd_ = "${pswd}" WHERE user_id = "${id}"`;
//     //const values = [nm,eml,pswd]
//     return dbPool.query(sqlUp);
// }

// export const delUser = async (id) => {
//     const sql = `DELETE FROM users where user_id = ${id}`

//     return dbPool.query(sql);
// }

//{Id: result.id_barang, Nama: result.nm_barang, Harga: result.hrg_barang, Jumlah: result.jmlh_barang}
export const createItem = async (request, response, next) => {
    try {
        let nm = request.body.nama; 
        let hrg = request.body.harga;
        let jmlh = request.body.jumlah;
        
        let tmp = {Nama: nm, Harga: hrg, Jumlah: jmlh}

        //const [tmpt] = ItemRepo.checkName(nm);
        let checkNm = ItemRepo.checkName(nm);
        let bol = checkNm == nm;
        console.log(nm, checkNm, bol);

        if (nm == ''){
            errorResp(response, "Nama Barang Tidak Boleh Kosong!")
        } else if (bol){
            errorResp(response, "Nama Sudah Tercantum!")
        } else if (hrg == ''){
            //Default 0
            const [result] = await ItemRepo.createData(nm, hrg=0, jmlh);
            successResp(response, "Success Menambahkan Data!, PENTING! - Harga Belum Tercantum!", tmp, 201)
        } else if (jmlh == ''){
            const [result] = await ItemRepo.updateData(nm, hrg, jmlh=0, id);        
            successResp(response, "Success Menambahkan Data!, PENTING! - Barang Kosong!", tmp, 201)
        } else {
            const [result] = await ItemRepo.createData(nm, hrg, jmlh);
            successResp(response, "Success Menambahkan Data", tmp, 201);        
        }
    } catch (error) {
        next(error)
    }   
}



export const getItem = async (request, response, next) => {
    try {
        const [result] = await ItemRepo.getData(100);
        if (result.length < 1){
            successResp(response, "Inventory Kosong!, Tambahkan Barang Segera!")
        } else {
            successResp(response, "Success", result)
        }
    } catch (error) {
        next(error);
    }
}
export const getItemById = async (request, response, next) => {
    try {
        let id = request.params.id;
        const [result] = await ItemRepo.getDataById(id);
        if (result.length > 0 && result != ''){
            successResp(response, `Barang Dengan ID: ${id} Ditemukan!`, result[0])
        } else {
            successResp(response, `Barang Dengan ID: ${id} Tidak Ditemukan!`, result[0])
        }
    } catch(error) {
        next(error)
    }
}
export const getItemByNm = async (request, response, next) => {
    //Mengambil Semua Data By nm_Barang!
    try {
        let nm = request.params.nm;
        const [result] = await ItemRepo.getDataByName(nm);

        if (result.length > 0 && result != ''){
            successResp(response, "Success - gItemNm", result[0])
        } else {
            successResp(response, "Barang Tidak Ditemukan! - Nama")
        }
    } catch(error) {
        next(error)
    }
}

//Untuk Mengambil Value dari Object!
//let tmp = Object.values(result[0]);

export const getStatItemByBol = async (request, response, next) => {
    //DONE!
    //Hanya Mengambil Data Barang Yang Tersedia / Tidak!
    //Hanya Menggunakan Angka 0(True)/1(False).
    //Tidak Sempat Menambahkan Untuk Pilihan Kombinasi String "True"/"False".
    try {
        let tf = request.params.bTF;
        let bol = isNaN(tf)

        if (tf == ':bTF'){
            errorResp(response, "Masukan Value!");
        } else if (bol || tf >= 2){
            errorResp(response, "Masukan Angka 0/1!, 0 Untuk True(Barang Tersedia!), 1 Untuk False(Barang Kosong!)")
        } else {
            const [result] = await ItemRepo.getStatusByBol(tf);            
            //let tmp = result;
            //console.log(tmp)
            if (result.length < 1){
                successResp(response, `Barang Dengan Jumlah ${tf} Tidak Ditemukan!`)
            } else {
                successResp(response, "Success!", result)
            }
        }
    } catch(error) {
        next(error)
    }
}
export const getStatItemByBol1 = async (request, response, next) => {
    //DONE!
    //Hanya Mengambil Data yang Memiliki Jumlah >= (Input)!
    try {
        let val_ = request.params.val;
        let bol = isNaN(val_)

        if (val_ == ':val' || val_ == 0){
            const [result] = await ItemRepo.getStatusByBol(0);  
            if (result.length < 1){
                successResp(response, `Tidak ada Barang Yang Kosong!`, result)
            } else {
                successResp(response, `Data Barang Yang Tidak Tersedia!`, result)
            }
        } else if (bol){
            errorResp(response, "Masukan Angka!")
        } else {
            const [result] = await ItemRepo.getStatusByBol1(val_);
            //console.log(result)

            if (result.length < 1){
                successResp(response, `Barang Dengan Jumlah ${val_} Tidak Ditemukan!`, result)
            } else {
                successResp(response, `Data Barang Dengan Jumlah ${val_}:`, result)
            }
        }
    } catch(error) {
        next(error)
    }
}



export const updateItemById = async (request, response, next) => {
    //DONE!
    try{
        let nm = request.body.nama; 
        let hrg = request.body.harga;
        let jmlh = request.body.jumlah;
        let id = request.params.id;
        if (id == ''){
            errorResp(response, "Barang Tidak Ditemukan! - ID")
        } else if(nm.length < 1){
            errorResp(response, "Nama Barang Tidak Boleh Kosong!")
        } else if (hrg == ''){
            //Default 0
            const [result] = await ItemRepo.updateData(nm, hrg=0, jmlh, id);
            successResp(response, "Success mengubah data!, PENTING! - Harga Belum Tercantum!")
        } else if (jmlh == ''){
            const [result] = await ItemRepo.updateData(nm, hrg, jmlh=0, id);        
            successResp(response, "Success mengubah data!, PENTING! - Barang Kosong!")
        }else {
            const [result] = await ItemRepo.updateData(nm, hrg, jmlh, id);
            successResp(response, "Success mengubah data", result, 201);
        }
    } catch(error) {
        next(error)
    }
}
export const delItemById = async (request, response, next) => {
    //DONE!
    try{
        let id_ = request.params.id;
        //console.log(id_.length)
        //console.log(typeof(id_)) //String!
        //console.log(parseInt(id_) == isNaN)
        let bol = isNaN(id_)
        console.log(bol)

        if (id_.length == ':id' || id_ == ':id'){
            errorResp(response, "Masukan ID!");
        } else if (bol){
            errorResp(response, "Masukan Angka!")
        } else {
            const [tmp] = await ItemRepo.getDataById(id_);

            if (tmp.length < 1){
                successResp(response, `Barang Dengan ID: ${id_} Tidak Ditemukan!`);
            } else {
                successResp(response, `Data Dengan ID: ${id_} Berhasil Dihapus`, ItemRepo.getData(100) ,201)
                const [result] = await ItemRepo.deleteData(id_);
            }
        }
    } catch(error){
        next(error)
    }
}