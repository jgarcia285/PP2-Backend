const { Schema, model } = require('mongoose');

const productSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    prize: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
    },
    category: {
        type: String,
        required: [true, 'La categoria es obligatoria']
    },
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Producto', productSchema);