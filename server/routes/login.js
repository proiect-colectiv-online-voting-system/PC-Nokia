var express = require('express');
var router = express.Router();

/* POST user login page. */
router.post('/', function(req, res, next) {
  console.log(JSON.stringify(req.body));
});

module.exports = router;
