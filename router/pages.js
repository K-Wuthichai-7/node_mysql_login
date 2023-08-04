const express = require('express');
const mysql = require("mysql");
const router = express.Router()
const dotenv = require("dotenv");


dotenv.config({ path: '../.env' });
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});



router.get('/', (req, res) => {
    res.render('index')
})

router.get('/register', (req, res) => {
    res.render('register')
})


//login user

router.get('/login', (req, res) => {
    res.render('login')
});



// เมื่อกดปุ่ม Submit จากฟอร์ม
router.post('/login', (req, res) => {
    const user_email = req.body.email;
    const user_password = req.body.password;

        // ค้นหา email password ในข้อมูลผู้ใช้งานในฐานข้อมูล
        db.query('SELECT email, password FROM user WHERE email= ? AND password= ?',

            [user_email,user_password], (error, result,) => {
                if (error) {
                    console.log(error);
                    return res.send('เกิดข้อผิดพลาดในการติดต่อฐานข้อมูล');
                }

                if (result.length > 0 ) {
                    for (count = 0; count < result.length; count++) {
                        if (result[count].email === user_email && result[count].password === user_password) {
                            return res.send('เข้าสู่ระบบสำเร็จ')
                        }
                    }
                } else {
                    return res.send('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
                }
              
        });

});




module.exports = router