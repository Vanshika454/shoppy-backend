const express = require('express');
const router = express.Router();
const userController = require('../controllers/user/userController');

const { auth } = require('../middlewares/auth');
const { multerErrorHandler, upload } = require('../middlewares/multer');

//get user data
router.get('/', auth, userController.getUser);

//update user data
router.put('/', auth, upload.single('image'), userController.updateUser);

router.use(multerErrorHandler);

module.exports = router;