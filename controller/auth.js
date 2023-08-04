const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { query } = require("express");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


exports.register = (req, res) => {


    const { name, email, password, passwordConfirm } = req.body;

    db.query('SELECT email FROM user WHERE email = ?', [email], async (error, result) => {

        if (error) {
            console.log(error)
            console.log(result)
        }

        if (result.length > 0) {
            return res.render("register", {
                message: "อีเมลนี้ลงทะเบียนเรียบร้อยแล้ว"
            })
        } if (password !== passwordConfirm) {
            return res.render('register', {
                message: "รหัสผ่านไม่ตรงกัน"
            });
        }
        //hash password เพื่อความปลอดภัย
        // let hashedPassword = await bcrypt.hash(password, 8);

        db.query('INSERT INTO user SET ?', { name: name, email: email, password: password }, (error, result) => {
            if (error) {
                console.log(error)
            } else {

                return res.render("register", {
                    message: "ลงทะเบียนสำเร็จ"
                })
            }
        })
    });




}