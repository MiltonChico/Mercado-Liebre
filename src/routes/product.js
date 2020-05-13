var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController')


router.get('/create/', productController.create); 
router.post('/create/', productController.store);

/* EDITAR PRODUCTO */

router.get('/edit/:id', productController.edit);
router.put('/edit/:id', productController.update);

/* PRODUCTOS Y DETALLE PRODUCTO*/

router.get('/:id/:category?', productController.product);
router.get('/', productController.products);

/*ELIMINAR PRODUCTO*/

router.delete('/delete/:id', productController.destroy);

/*** CREAR PRODUCTO ***/ 










module.exports = router;
