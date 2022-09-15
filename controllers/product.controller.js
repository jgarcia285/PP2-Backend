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

const productPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, ...rest } = req.body;

    const product = await Producto.findByIdAndUpdate(id, rest);

    res.json({
        product
    })
}

const productGet = async (req, res = response) => {

    const { limit } = req.query;
    const query = { status: true }

    const [total, products] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .limit(Number(limit))
    ])

    res.json({
        total,
        products
    });
}

const productDelete = async (req, res) => {

    const { id } = req.params;

    const product = await Producto.findByIdAndUpdate(id, { status: false });

    res.json({
        product
    })
}

module.exports = {
    productPost,
    productPut,
    productGet,
    productDelete

}