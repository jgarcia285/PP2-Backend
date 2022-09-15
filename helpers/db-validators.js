const Usuario = require('../models/user')
const Producto = require('../models/product')

const emailExists = async (email = '') => {
    const emailExists = await Usuario.findOne({ email });

    if (emailExists) {
        throw new Error(`El correo ya está registrado`);
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

module.exports = {
    emailExists,
    userExistsById,
    productExistsById
};