const express = require('express');
const cors = require('cors');
const hbs = require('hbs');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.app.set('view engine', 'hbs');

        this.conectarDB();



        //Middlewares: Funciones que siempre se van a ejecutar cuando levantemos nuestro sv
        this.middlewares();

        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        this.app.use(cors());

        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use('/', require('../routes/user.routes'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto http://localhost:${this.port}`);
        })
    }

}

module.exports = Server;