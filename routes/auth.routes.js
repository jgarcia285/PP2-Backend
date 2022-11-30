//
const { Router } = require('express');
const { check } = require('express-validator');

const { login, logout } = require('../controllers/auth.controller');
const { validate_fields } = require('../middlewares/validation_fields');

const router = Router();

router.post('/login', [
    check('email', 'El correo no es valido').isEmail(),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('pass', 'La contraseña es obligatoria').not().isEmpty(),
    validate_fields
], login)

router.get('/logout', logout)

module.exports = router;