const Usuario = require('../models/user')
const Producto = require('../models/product')
const Categoria = require('../models/category')

const emailExists = async (email = '') => {
    const emailExists = await Usuario.findOne({ email });

    console.log(emailExists)

    if (emailExists) {
        throw new Error(`El correo ya está registrado`);
    }

}

/*
const categoryExistsById = async (id) => {

    const categoryExists = await Categoria.findById(id)

    if (!categoryExists) {
        throw new Error('La categoria no existe');
    }
}

*/

const categoryExistsById = async (category) => {

    const categoryExists = await Categoria.findOne({ category })

    console.log(categoryExists)

    if (!categoryExists) {
        throw new Error('La categoria no existe');
    }

}


const userExistsById = async (id) => {
    const userExists = await Usuario.findById(id);

    if (!userExists) {
        throw new Error(`El id no existe`);
    }

}

const productExistsById = async (id) => {
    const productExists = await Producto.findById(id);

    if (!productExists) {
        throw new Error(`El id no existe`);
    }

}

const allowedCollections = (collection = '', collections = []) => {

    const include = collections.includes(collection);

    if (!include) {
        throw new Error(`La colleccion ${collection} no es permitida. Colleciones permitidas: ${collections}`);
    }

    return true;

}

module.exports = {
    emailExists,
    userExistsById,
    productExistsById,
    categoryExistsById,
    allowedCollections
};