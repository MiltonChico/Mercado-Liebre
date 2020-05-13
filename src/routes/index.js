var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');

/* GET HOME */
router.get('/', productController.index)


module.exports = router;
