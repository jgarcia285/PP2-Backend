const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/user');

const userPost = async(req, res = response) => {

    const { name, email, pass } = req.body;
    const user = new Usuario({name, email, pass});

    //salt es el numero de vueltas que se encarga
    //de complicar el nivel de encriptacion
    const salt = bcryptjs.genSaltSync();
    user.pass = bcryptjs.hashSync(pass, salt);

    await user.save();

    res.json(
        user
    )

}

const userPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, pass, ...rest } = req.body;

    if (pass) {
        const salt = bcryptjs.genSaltSync();
        rest.pass = bcryptjs.hashSync(pass, salt);
    }

    const user = await Usuario.findByIdAndUpdate(id, rest);

    res.json({
        user
    })
}

const userGet = async (req, res = response) => {

    const { limit } = req.query;
    const query = { status: true }

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

const userGetById = async (req, res = response) => {

    const { id } = req.params;
    const user = await Usuario.findById(id)

    res.json(user);

}

const userDelete = async (req, res) => {

    const { id } = req.params;
    const user = await Usuario.findByIdAndUpdate(id, { status: false });

    res.json({
        user
    })
}

module.exports = {
    userPost,
    userPut,
    userGet,
    userGetById,
    userDelete
}