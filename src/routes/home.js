const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/HomeController');

// router.get('/logout', homeController.logout);
router.post('/search', homeController.search);
router.post('/delete_product_list', homeController.deleteProduct);
router.post('/update_product_list', homeController.updateProduct);
router.post('/product_list', homeController.addProductList);
router.get('/product_list', homeController.productList);
router.post('/delete_user_list', homeController.deleteUser);
router.post('/update_user_list', homeController.updateUser);
router.get('/user_list', homeController.userList);
router.post('/profile', homeController.editProfile);
router.get('/profile', homeController.profile);
router.use('/', homeController.index);

module.exports = router;