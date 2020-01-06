// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

/* GET - home page. */
router.get('/', mainController.index);

router.get('/crear', mainController.crear);

router.post('/crear', mainController.guardar);

router.delete('/borrar/:idProducto', mainController.borrar);

module.exports = router;
