var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');


/* GET home page. */
router.get('/', async function (req, res, next) {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('Client IP:', clientIp);

  const response = await axios.post('https://apidev01.microleasingplc.com:8001/loginLog', JSON.stringify(`{"ip-addr1":"${clientIp}", "ip-addr2":"-"},\r\n`), {
    headers: {
      'Content-Type': 'application/json'
      // ถ้าปลายทางต้องใช้ token / auth ก็เพิ่ม header ตรงนี้
    }
  });


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
