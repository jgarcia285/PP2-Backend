const { Router } = require('express');
const { check } = require('express-validator');

const { validate_fields } = require('../middlewares/validation_fields');
const { validateFiles } = require('../middlewares/validation_files')

const { fileUploadDB, showImage, updateImage } = require('../controllers/uploads.controller');

const { allowedCollections } = require('../helpers/db-validators');

const router = Router();

router.post('/', [
    validateFiles
], fileUploadDB)

router.put('/:collection/:id', [
    validateFiles,
    check('id', 'No es un id de Mongo').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validate_fields
], updateImage)

router.get('/:collection/:id', [
    check('id', 'No es un id de Mongo').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validate_fields
], showImage)

module.exports = router;