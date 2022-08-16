const { Router } = require('express');

const router = Router();

const { productPost } = require('../controllers/product.controller');

router.post('/', productPost)

module.exports = router;