const { Router } = require('express');
const { check } = require('express-validator');

const { validate_fields } = require('../middlewares/validation_fields');
const { validateJWT } = require('../middlewares/validation_jwt');
const { isAdminRole } = require('../middlewares/validation_roles');

const { categoryExistsById } = require('../helpers/db-validators')
const { productExistsById } = require('../helpers/db-validators');

const { createProduct, deleteProduct, getProducts, updateProduct } = require('../controllers/product.controller');

const router = Router();

router.get('/', getProducts)

router.post('/', [
    validateJWT,
    isAdminRole,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('prize', 'El precio es obligatorio').not().isEmpty(),
    check('stock', 'La cantidad es obligatoria').not().isEmpty(),
    check('category', 'La categoria es obligatoria').isMongoId(),
    check('category').custom(categoryExistsById),
    validate_fields
], createProduct)

router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(productExistsById),
    validate_fields
], updateProduct)

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(productExistsById),
    validate_fields
], deleteProduct)

module.exports = router;