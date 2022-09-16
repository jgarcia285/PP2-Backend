const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    pass: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
        default: 'USER_ROLE'
    },
    status: {
        type: Boolean,
        default: true
    }
})


//Sobreescribir el .toJSON para no mostrar la contraseña al agregar un usuario
userSchema.methods.toJSON = function(){

    const { __v, pass, role, status, ...user } = this.toObject()
    return user;

}

module.exports = model('Usuario', userSchema);