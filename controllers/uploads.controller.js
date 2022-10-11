const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require('express');

const { uploadFile } = require('../helpers/upload-file')

const Usuario = require('../models/user')
const Producto = require('../models/product')

const fileUploadDB = async (req, res = response) => {

    try {

        const namePath = await uploadFile(req.files);

        res.json({
            namePath
        })

    } catch (err) {
        res.status(400).json({
            err
        })
    }

}

const updateImageLegacy = async (req, res = response) => {

    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await Usuario.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;

        case 'products':
            model = await Producto.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }

            break;

        default:
            return res.status(500).json({ msg: 'Falta validar esto' })
    }

    //Limpia imagenes previas
    try {
        if (model.img) {
            const pathImage = path.join(__dirname, '../uploads', collection, model.img);
            if (fs.existsSync(pathImage)) {
                fs.unlinkSync(pathImage);
            }
        }


    } catch (err) {
        res.status(400).json(err)
    }

    const name = await uploadFile(req.files, undefined, collection);
    model.img = name;

    await model.save();

    res.json(model)

}

const updateImage = async (req, res = response) => {

    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await Usuario.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;

        case 'products':
            model = await Producto.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }

            break;

        default:
            return res.status(500).json({ msg: 'Falta validar esto' })
    }

    //Limpia imagenes previas
    try {
        if (model.img) {
            const nameArr = model.img.split('/');
            const name = nameArr[nameArr.length - 1];
            const [public_id_cloudinary] = name.split('.');

            cloudinary.uploader.destroy(public_id_cloudinary);
        }

    } catch (err) {
        res.status(400).json(err)
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    model.img = secure_url;

    await model.save();

    res.json(model);
}

const showImage = async (req, res = response) => {

    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await Usuario.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;

        case 'products':
            model = await Producto.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }

            break;

        default:
            return res.status(500).json({ msg: 'Falta validar esto' })
    }

    //Limpia imagenes previas
    try {
        if (model.img) {
            const pathImage = path.join(__dirname, '../uploads', collection, model.img);
            if (fs.existsSync(pathImage)) {
                return res.sendFile(pathImage);
            }
        }
    } catch (err) {
        res.status(400).json(err)
    }

    const noImage = path.join(__dirname, '../assets/no-image.jpg');

    res.sendFile(noImage);

}

module.exports = {
    fileUploadDB,
    updateImage,
    showImage
}