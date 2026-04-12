const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');

router.get('/comments/list', CommentController.get);
router.get('/comments/product/:product_id', CommentController.getByProduct);
router.post('/comments/add', CommentController.create);
router.put('/comments/status/:id', CommentController.updateStatus);
router.delete('/comments/:id', CommentController.delete);

module.exports = router;