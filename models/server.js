const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.conectarDB();
        this.app.set('view engine', 'hbs');

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

        this.app.get('/', (req, res) => {
            res.render('home', this.renderOptions);
        });

        this.app.get('/carrito', (req, res) => {
            res.render('carrito', this.renderOptions);
        });

        this.app.get('/catalogo', (req, res) => {
            res.render('catalogo', this.renderOptions);
        });

        this.app.get('/contacto', (req, res) => {
            res.render('contacto', this.renderOptions);
        });

        this.app.get('/legales', (req, res) => {
            res.render('legales', this.renderOptions);
        });

        this.app.get('/login', (req, res) => {
            res.render('login', this.renderOptions);
        });

        this.app.get('/nosotros', (req, res) => {
            res.render('nosotros', this.renderOptions);
        });

        this.app.get('/registro', (req, res) => {
            res.render('registro', this.renderOptions);
        });

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto http://localhost:${this.port}`);
        })
    }

}

module.exports = Server;