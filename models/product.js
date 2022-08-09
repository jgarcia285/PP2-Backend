const { Schema, model } = require('mongoose');

const productSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    prize: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    category: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Producto', productSchema);