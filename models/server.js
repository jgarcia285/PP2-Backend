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
            res.sendFile('index.html', { root: 'public' });
        });

        this.app.get('/carrito', (req, res) => {
            res.sendFile('templates/carrito.html', { root: 'public' });
        });

        this.app.get('/catalogo', (req, res) => {
            res.sendFile('templates/catalogo.html', { root: 'public' });
        });

        this.app.get('/contacto', (req, res) => {
            res.sendFile('templates/contacto.html', { root: 'public' });
        });

        this.app.get('/legales', (req, res) => {
            res.sendFile('templates/legales.html', { root: 'public' });
        });

        this.app.get('/login', (req, res) => {
            res.sendFile('templates/login.html', { root: 'public' });
        });

        this.app.get('/nosotros', (req, res) => {
            res.sendFile('templates/nosotros.html', { root: 'public' });
        });

        this.app.get('/registro', (req, res) => {
            res.sendFile('templates/registro.html', { root: 'public' });
        });

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto http://localhost:${this.port}`);
        })
    }

}

module.exports = Server;