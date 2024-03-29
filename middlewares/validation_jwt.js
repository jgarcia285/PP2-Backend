const { response, request } = require('express')
const jwt = require('jsonwebtoken');

const Usuario = require('../models/user')

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('xtoken');

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await Usuario.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: "Token no valido - usuario no existe en la base de datos"
            })
        }

        //Verificar si el uid tiene estado true
        if (!user.status) {
            return res.status(401).json({
                msg: "Token no valido - usuario eliminado"
            })
        }

        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({
            msg: "Token no valido"
        })
    }


}

module.exports = {
    validateJWT
}