const express = require('express');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares: Funciones que siempre se van a ejecutar cuando levantemos nuestro sv
        this.middlewares();

        this.routes();
    }

    middlewares() {
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.get('/carrito', (req, res) => {
            res.sendFile('templates/carrito.html', { root: 'public' });
        })

        this.app.get('/catalogo', (req, res) => {
            res.sendFile('templates/catalogo.html', { root: 'public' });
        })

        this.app.get('/contacto', (req, res) => {
            res.sendFile('templates/contacto.html', { root: 'public' });
        })

        this.app.get('/legales', (req, res) => {
            res.sendFile('templates/legales.html', { root: 'public' });
        })

        this.app.get('/login', (req, res) => {
            res.sendFile('templates/login.html', { root: 'public' });
        })

        this.app.get('/nosotros', (req, res) => {
            res.sendFile('templates/nosotros.html', { root: 'public' });
        })

        this.app.get('/registro', (req, res) => {
            res.sendFile('templates/registro.html', { root: 'public' });
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto http://localhost:${this.port}`);
        })
    }

}

module.exports = Server;