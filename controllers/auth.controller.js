const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req = request, res = response) => {

    const { email, pass } = req.body;

    try {

        //Verificar que el email exista
        const user = await Usuario.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Correo / pass incorrectos'
            })
        }

        //Verificar si el usuario esta activo en la db
        if(!user.status){
            return res.status(400).json({
                msg: 'Status false'
            })
        }

        //Verificar contraseña
        const validPass = bcryptjs.compareSync(pass, user.pass);

        if(!validPass){
            return res.status(400).json({
                msg: 'Incorrect pass'
            })
        }

        //Generar JWT
        const token = await generateJWT(user.id);

        req.session.jwt = token;

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }

}

const logout = async (req = request, res) => {

    res.clearCookie('connect.sid');
    req.session.destroy();

    res.json('Sesion cerrada');


}

module.exports = {
    login,
    logout
}