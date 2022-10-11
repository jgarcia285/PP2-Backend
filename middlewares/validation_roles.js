const { response } = require("express");

const isAdminRole = (req, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar antes"
        })
    }

    const { role, name } = req.user;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `Solo un administrador puede realizar esta accion ${name}`
        })
    }

    next();

}

module.exports = {
    isAdminRole
}