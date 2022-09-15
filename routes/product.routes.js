const { Router } = require('express');
const { check } = require('express-validator');

const { validate_fields } = require('../middlewares/validation_fields');
const { productExistsById } = require('../helpers/db-validators');
const { productPost, productPut, productGet, productDelete } = require('../controllers/product.controller');

const router = Router();

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('prize', 'El precio es obligatorio').not().isEmpty(),
    check('category', 'La categoria es obligatoria').not().isEmpty(),
    validate_fields
], productPost)

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(productExistsById),
    validate_fields
], productPut)

router.get('/', productGet)

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(productExistsById),
    validate_fields
], productDelete)

module.exports = router;