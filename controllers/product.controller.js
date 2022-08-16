const { response } = require('express');

const Producto = require('../models/product');

const productPost = async (req, res = response) => {

    const { name, prize, category, status } = req.body;
    const product = new Producto({ name, prize, category, status });

    await product.save();

    res.json({
        product
    })

}

module.exports = {
    productPost,

}