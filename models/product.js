const { Schema, model } = require('mongoose');

const productSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    prize: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, 'La categoria es obligatoria']
    },
    img: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: [true, 'La cantidad es obligatoria']
    },
    description: { type: String},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

productSchema.methods.toJSON = function(){

    const { __v, status,  ...product } = this.toObject()
    return product;

}

module.exports = model('Producto', productSchema);