const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        await mongoose.connect(process.env.MONGODB_CNN);

    } catch (error) {
        console.error(error);
        throw new Error('Error al levantar la base de datos');
    }
}

module.exports = {
    dbConnection,
}