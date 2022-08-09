const Role = require('../models/role');
const Usuario = require('../models/user')

const validateRole = async (role = '') => {

    const roleExists = await Role.findOne({ role });

    if (!roleExists) {
        throw new Error(`El rol ${role} no es valido`);
    }
}

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

module.exports = {
    validateRole,
    emailExists,
    userExistsById
};