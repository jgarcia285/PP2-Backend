const { response } = require('express');

const Producto = require('../models/product');
const Categoria = require('../models/category');

const createProduct = async (req, res = response) => {

    const { status, user, ...body } = req.body;
    const name = req.body.name.toUpperCase();
    const category = req.body.category.toUpperCase();

    const productDB = await Producto.findOne({ name });
    const categoryDB = await Categoria.findOne({ category }).populate('name')

    if (productDB) {
        return res.status(400).json({
            msg: `El producto ${productDB.name} ya existe`
        })
    }

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        category: categoryDB._id,
        user: req.user._id
    }

    const product = new Producto(data);

    await product.save();

    res.status(201).json(product);

}

const updateProduct = async (req, res = response) => {

    const { id } = req.params;
    const { status, user, ...data } = req.body;

    data.user = req.user._id;

    const product = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json(product)
}

const getProducts = async (req, res = response) => {

    const { limit } = req.query;
    const query = { status: true }

    const [total, products] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .limit(Number(limit))
    ])

    res.json({
        total,
        products
    });
}

const deleteProduct = async (req, res) => {

    const { id } = req.params;

    const deletedProduct = await Producto.findByIdAndUpdate(id, { status: false });

    res.json({
        deletedProduct
    })
}

module.exports = {
    createProduct,
    deleteProduct,
    getProducts,
    updateProduct

}