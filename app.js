const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: './.env' });

const app = express()
const port = 8000;

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

//parse url-encoded bodies (at sent by html form)
app.use(express.urlencoded({ extended: false}));
//parse json bodies (at sent by html form)
app.use(express.json());


app.set("view engine", 'hbs');

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("connected to database")
    }
})

//define router
app.use('/', require("./router/pages"));
app.use('/auth', require('./router/auth'))
app.use('/login', require('./router/pages'))

app.listen(port, () => {
    console.log("start server on port", + port);
})