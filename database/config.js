const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        await mongoose.connect ("mongodb+srv://admin_node:ZdS4azpu9hdvhCDc@hnktech.1lmhr.mongodb.net/hnkdb", {useNewUrlParser: true});

    } catch (error) {
        console.error(error);
        throw new Error('Error al levantar la base de datos');
    }
}

module.exports = {
    dbConnection,
}