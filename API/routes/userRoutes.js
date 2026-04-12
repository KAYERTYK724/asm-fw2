const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/users/list', UserController.get);
router.post('/users/register', UserController.create); // Thường gọi là register thay vì add
router.get('/users/:id', UserController.getById);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.delete);

module.exports = router;