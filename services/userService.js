import * as UserRepo from '../repositories/user.js';
import { errorResp, successResp } from '../utils/response.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// const bcrypt = require('bcrypt');
// const saltRounds = 10;   untuk menentukan jumlah char.
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

//SecretKey!
const SECRET_ACCESS_TOKEN = 'kelas.com';
const SECRET_REFRESH_TOKEN = 'backend';

export const createUser = async (request, response, next) => {
    try {
        let name = request.body.name; 
        let email = request.body.email;
        let password = request.body.password;
        let saltRound = 10;

        bcrypt.hash(password, saltRound, async (err, hash) => {
            // Store hash in your password DB.
            const [result] = await UserRepo.createData(name, email, hash);
            successResp(response, "success menambahkan data", {user_id: result.insertId}, 201);
        });
        
    } catch (error) {
        next(error)
    }
    
}



export const upUser = async (id, nm, eml, pswd) => {
    //let up_at = new Date();
    const sqlUp = `UPDATE users SET name_ = "${nm}", email_ = "${eml}", pwd_ = "${pswd}" WHERE user_id = "${id}"`;
    //const values = [nm,eml,pswd]
    return dbPool.query(sqlUp);
}

export const delUser = async (id) => {
    const sql = `DELETE FROM users where user_id = ${id}`

    return dbPool.query(sql);
}



export const getUser = async (request, response, next) => {
    try {
        const [result] = await UserRepo.getData(100);
        successResp(response, "success", result)
    } catch (error) {
        next(error);
    }
}

export const getUerById = async (request, response, next) => {
    try {
        let id = request.params.id;
        const [result] = await UserRepo.getDataById(id);

        successResp(response, "success", result[0])
    } catch(error) {
        next(error)
    }
}

export const getUerByEm = async (request, response, next) => {
    try {
        let email_ = request.params.email;
        const [result] = await UserRepo.getDataByEmail(email_);

        successResp(response, "success", result[0])
    } catch(error) {
        next(error)
    }
}

export const updateById = async (request, response, next) => {
    try{
        let name = request.body.name; 
        let email = request.body.email;
        let password = request.body.password;
        let id = request.params.id;

        const [result] = await UserRepo.updateData(name, email, password, id);

        successResp(response, "success mengubah data", {user_id: result.insertId}, 201);

    } catch(error){
        next(error)
    }
}

export const delById = async (request, response, next) => {
    try{
        let id = request.params.id;

        const [result] = await UserRepo.deleteData(id);

        successResp(response, "Data berhasil dihapus", 201)

    } catch(error){
        next(error)
    }
}



//NPM.js Bcrypt
export  const authUser = async (request, response, next) => {
    try {
        let email_ = request.body.email;
        let pwd__ = request.body.password;
        const [result] = await UserRepo.getDataByEmail(email_);

        if (result.length > 0) {
            const user = result[0];
            console.log(pwd__, user.pwd_)
            bcrypt.compare(pwd__, user.pwd_, (error, result) => {
                console.log(result)
                if (result) {
                    let claims = {
                        id: user.user_id,
                        name: user.name_,
                        email: user.email_
                    };
                    console.log(claims);
                    if (JSON.stringify(claims) !== '{}') {
                        let accessToken = jwt.sign(claims, SECRET_ACCESS_TOKEN, {expiresIn: '15m'});
                        let refreshToken = jwt.sign(claims, SECRET_REFRESH_TOKEN, {expiresIn:'30m' })

                        let data = {
                            access_Token: accessToken,
                            refresh_token: refreshToken,
                        }
                        successResp(response, "Success Login!", data);                                        
                    } else {
                        errorResp(response, "No Data!", 401)
                    }
                } else {
                    errorResp(response, "Invalid Email or Password 401!", 401)
                }
            })
        } else {
            errorResp(response, "Invalid Email or Password 402!", 402)
        }
    } catch (error){
        next(error)
    }
}

export const validateToken = (request, response, next) => {
    const authHeader = request.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];

    if(accessToken == null){
        errorResp(response, "Invalid Request! Please Authenticates First in '/auth'")        
    }
    jwt.verify(accessToken, SECRET_ACCESS_TOKEN, (error, claims) => {
        if (error) {            
        errorResp(response, error.message, 403)
        } else {
            request.claims = claims;
            console.log(claims)
            next()
        }
    })
}