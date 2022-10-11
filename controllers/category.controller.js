const { response } = require('express');
const Categoria = require('../models/category')

//getCategories - pagina - total - populate
const getCategories = async (req, res = response) => {

    const { limit } = req.query;
    const query = { status: true }

    const [total, categories] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('user', 'name')
            .limit(Number(limit))
    ])

    res.json({
        total,
        categories
    });
}

//getCategory - populate {}
const getCategory = async (req, res = response) => {

    const { id } = req.params;
    const category = await Categoria.findById(id).populate('user', 'name');

    res.json(category);

}

//updateCategory
const updateCategory = async (req, res = response) => {

    const { id } = req.params;
    const { status, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json(category);

}

//deleteCategory
const deleteCategory = async (req, res = response) => {

    const { id } = req.params;

    const deletedCategory = await Categoria.findByIdAndUpdate(id, { status: false });

    res.json({
        deletedCategory
    })

}

const createCategory = async (req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Categoria.findOne({ name });

    if (categoryDB) {
        return res.status(400).json({
            msg: `La categoria ${categoryDB.name} ya existe en la base de datos`
        })
    }

    const data = {
        name,
        user: req.user._id
    }

    const category = new Categoria(data)

    await category.save();

    res.status(201).json(category);

}

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}