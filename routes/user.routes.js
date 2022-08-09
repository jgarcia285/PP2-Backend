const { Router } = require('express');
const { check } = require('express-validator');

const { validate_fields } = require('../middlewares/validation_fields');
const { validateRole, emailExists, userExistsById } = require('../helpers/db-validators');

const router = Router();

const { userPost,
    userPut,
    userDelete } = require('../controllers/user.controller');

router.post('/', [
    check('email', 'El correo no es valido').isEmail(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('pass', 'La contraseña es obligatoria').not().isEmpty(),
    //check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(validateRole),
    check('email').custom(emailExists),
    validate_fields
], userPost)

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userExistsById),
    validate_fields
], userPut)

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userExistsById),
    validate_fields
], userDelete)


module.exports = router;