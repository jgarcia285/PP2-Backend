const { Schema, model } = require('mongoose');

const categorySchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

categorySchema.methods.toJSON = function(){

    const { _id, __v,  status, ...category } = this.toObject();
    category.uid = _id;
    return category;

}

module.exports = model('Categoria', categorySchema);