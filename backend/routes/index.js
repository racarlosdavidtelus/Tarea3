var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.status(200).send("Server Tarea3 - Up and Running");
});

module.exports = router;