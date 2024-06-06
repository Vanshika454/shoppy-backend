const express = require('express');
const router = express.Router();
const productController = require('../controllers/product/productController');

const { auth } = require('../middlewares/auth');
const { admin } = require('../middlewares/admin');
const { multerErrorHandler, upload } = require('../middlewares/multer');

//Get all products
router.get('/', auth, productController.getProducts);

//Get a product by id
router.get('/:id', auth, productController.getProductById);

//Create a new product
router.post('/', auth, admin, upload.single('image'), productController.createProduct); 

router.use(multerErrorHandler);

module.exports = router;