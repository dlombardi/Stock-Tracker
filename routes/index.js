var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("yes");
  var url = req.url;
    if(url === "/") {
      url = "/index.html";
    }
    fs.readFile(__dirname + "/src" + url, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    else {
        res.writeHead(200);
    }
    console.log("serving file: " + url);
    res.end(data);
  });
  res.send(200);
});

module.exports = router;
