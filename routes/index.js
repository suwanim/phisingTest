var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/submit', function (req, res, next) {
  console.log('/submit', req.body)

// ดึงข้อมูลจากฟอร์ม
  const data = `${JSON.stringify(req.body)},\r\n`

 const filePath = path.join(__dirname, '../public/health_data.txt');

  fs.appendFile(filePath, data, (err) => {
    if (err) {
      console.error('❌ เขียนไฟล์ไม่สำเร็จ:', err);
      return res.status(500).send('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
    console.log('✅ บันทึกข้อมูลเรียบร้อย');
    res.send('<h2>บันทึกข้อมูลเรียบร้อยแล้ว!</h2><a href="/">กลับหน้าฟอร์ม</a>');
  });
});

module.exports = router;
