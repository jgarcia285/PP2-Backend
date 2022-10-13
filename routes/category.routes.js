const { Router } = require('express');
const { check } = require('express-validator');

const { validate_fields } = require('../middlewares/validation_fields');
const { validateJWT } = require('../middlewares/validation_jwt');
const { isAdminRole } = require('../middlewares/validation_roles')

const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');
const { categoryExistsById } = require('../helpers/db-validators');

const router = Router();

//Obtener todas las categorias
router.get('/', [
    validateJWT,
    isAdminRole,
    validate_fields
], getCategories)

//Obtener una categoria por id
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(categoryExistsById),
    validate_fields
], getCategory)

//Crear una categoria
router.post('/', [
    validateJWT,
    isAdminRole,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validate_fields
], createCategory)

//Actualizar categoria
router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(categoryExistsById),
    validate_fields
], updateCategory)

//Borrar categoria
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(categoryExistsById),
    validate_fields
], deleteCategory)


module.exports = router;