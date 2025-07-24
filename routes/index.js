var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  res.render("index", {
    title: `Microleasing Healthcare`,
    clientIp: `${clientIp}`,
  });

});
module.exports = router;
