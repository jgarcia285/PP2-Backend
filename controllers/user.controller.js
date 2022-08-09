const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/user');

/*
const userGet = async (req, res = response) => {

    const { limit } = req.query;
    const query = { status: true }

    //const users = await Usuario.find(query)
    //    .limit(Number(limit));

    //const total = await Usuario.countDocuments(query);

    const [total, users] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .limit(Number(limit))
    ])

    res.json({
        total,
        users
    });
}

*/

const userPost = async (req, res) => {

    const { name, email, pass, role } = req.body;
    const user = new Usuario({ name, email, pass, role });

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.pass = bcryptjs.hashSync(pass, salt);

    //Guardar en DB
    await user.save();

    res.json({
        user
    })
}

const userPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, pass, google, email, ...rest } = req.body;

    if (pass) {
        const salt = bcryptjs.genSaltSync();
        rest.pass = bcryptjs.hashSync(pass, salt);
    }

    const user = await Usuario.findByIdAndUpdate(id, rest);

    res.json({
        user
    })
}

const userDelete = async (req, res) => {

    const { id } = req.params;

    //Borrar de la base de datos
    //const user = await Usuario.findByIdAndDelete(id);

    //Cambiar estado a false
    const user = await Usuario.findByIdAndUpdate(id, { status: false });

    res.json({
        user
    })
}

module.exports = {
    userPost,
    userPut,
    userDelete
}