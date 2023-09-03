/*
    Parms Input
        - Get all data:                         /users
        - Get data by Id_Barang:                /users/:id
        - Get data by Nama_Barang:              /users.n/:nm
        - Get Status_Barang by Nama_Barang:     /users.j/:jmlh
            (Apakah Barang Ada Stock Atau Tidak)

        - Search By Id_Barang:                  /items/:id
        - Search By Nama_Barang:                /items.a/:nm
        - Search By Jumlah_Barang:              /items.j/:jmlh
    Body Input
    {
        nama: 'STRING'
        harga: NUMERIC
        jumlah: NUMERIC
    }
*/

import express from 'express';
import itemRouter from './routes/itemsRouter.js';
import userRouter from './routes/usersRoute.js';
import authRouter from './routes/authRoutes.js';
import { errorResp } from './utils/response.js';

const app = express();
const port = 8000;
const host = "localhost";

app.use(express.json());
//Grouping Path for users!
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/items", itemRouter);
app.use((error, request, response, next) => {
    const message = 'Internal Server Error';
    console.log(error.message);
    errorResp(response, message, 500)
});

app.listen(port, host, ()=> {
    console.log(`Server berjalan di http://${host}:${port}`)
})

/*Function dalam file itemService.js banyak berisikan if() yang serupa, 
    saya terlambat sadar kalau if() tersebut dapat di but di function yang dapat
    dipanggil jadi saya tidak membuatnya
*/

/*  Query Database saya cantumkan dikarenakan saat saya mengexport dari MySQL Workbench 
    saya diberi warning kalau versi mysqldump.exe dan MySQL Server tidak sama 
    dan hal ini dapat mengakibatkan beberapa fitur tidak dapat di backup

CREATE TABLE users (
	user_id	int auto_increment,
    name_	varchar(100),
    email_	varchar(100),
    pwd_	varchar(255),
    create_at	datetime,
    updated_at	datetime,
    constraint	users_pk
		primary key(user_id)
);

CREATE TABLE items (
	id_barang	int auto_increment,
	nm_barang	varchar(100),
	hrg_barang	int(11),
	jmlh_barang	int(11),
    created_at datetime,
    updated_at datetime,
    constraint items_pk
		primary key(id_barang)
);
*/