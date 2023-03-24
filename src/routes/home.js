const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/HomeController');

router.use('/user_list', homeController.showUserList);
router.use('/product_list', homeController.showProductList);
router.use('/', homeController.index);

module.exports = router;