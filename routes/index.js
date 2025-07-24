var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require("axios");

/* GET home page. */
router.get('/', async function (req, res, next) {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('Client IP:', clientIp);

  const data = {
    "ip-addr1": clientIp,
    "ip-addr2": "-"
  };

  try {
    await axios.post('https://apidev01.microleasingplc.com:8001/loginLog', data, {
      headers: {
        'Content-Type': 'application/json'
        // เพิ่ม token / auth ถ้าจำเป็น
      }
    });
    console.log('✅ ส่ง IP log เรียบร้อย');
  } catch (err) {
    console.error('❌ ส่ง IP log ไม่สำเร็จ:', err.message);
  }

  res.render("index", {
    title: `Microleasing Healthcare`,
    clientIp: `Client IP: ${clientIp}`,
  });

});

router.post('/submit', async function (req, res, next) {
  console.log('/submit', req.body)

  // ดึงข้อมูลจากฟอร์ม
  // ยิงไปยัง API ของอีกโปรเจค
  const response = await axios.post('https://apidev01.microleasingplc.com:8001/submit', data, {
    headers: {
      'Content-Type': 'application/json'
      // ถ้าปลายทางต้องใช้ token / auth ก็เพิ่ม header ตรงนี้
    }
  });

  console.log('✅ ส่งข้อมูลไปปลายทางเรียบร้อย:', response.status);

  // ตอบกลับไปยัง client
  res.send('<h2>ส่งข้อมูลไป API ปลายทางเรียบร้อยแล้ว!</h2>');

});

module.exports = router;
