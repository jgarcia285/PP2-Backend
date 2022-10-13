const { Router } = require('express');
const { check } = require('express-validator');

const { validate_fields } = require('../middlewares/validation_fields');
const { validateJWT } = require('../middlewares/validation_jwt');
const { isAdminRole } = require('../middlewares/validation_roles');

const { userPost, userPut, userGet, userDelete } = require('../controllers/user.controller');
const { emailExists, userExistsById } = require('../helpers/db-validators');

const router = Router();

router.post('/', [
    check('email', 'El correo no es valido').isEmail(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('pass', 'La contraseña es obligatoria').not().isEmpty(),
    check('email').custom(emailExists),
    validate_fields
], userPost)

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userExistsById),
    validate_fields
], userPut)

router.get('/', [
    validateJWT,
    isAdminRole,
    validate_fields
], userGet)

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userExistsById),
    validate_fields
], userDelete)

module.exports = router;