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
    console.log(req.body)

    const { name, email, password, passwordConfirm } = req.body;

    db.query('SELECT email FROM user WHERE email = ?', [email], async (error, result) => {
        if (error) {
            console.log(error)
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

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword)
        db.query('INSERT INTO user SET ?', { name: name, email: email, password: hashedPassword },(error,result)=>{
                if(error){
                    console.log(error)
                }else{
                    console.log(result)
                    return res.render("register", {
                        message: "ลงทะเบียนสำเร็จ"
                    })
                }
        })
    });



   
}