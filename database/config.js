const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        const uri = process.env.MONGODB_CNN;

        console.log(typeof(uri));

        await mongoose.connect(uri);

    } catch (error) {
        console.error(error);
        throw new Error('Error al levantar la base de datos');
    }
}

module.exports = {
    dbConnection,
}