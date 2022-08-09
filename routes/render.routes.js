const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index');
});

router.get('/carrito', (req, res) => {
    res.sendFile('templates/carrito.html', { root: 'public' });
});

router.get('/catalogo', (req, res) => {
    res.sendFile('templates/catalogo.html', { root: 'public' });
});

router.get('/contacto', (req, res) => {
    res.sendFile('templates/contacto.html', { root: 'public' });
});

router.get('/legales', (req, res) => {
    res.sendFile('templates/legales.html', { root: 'public' });
});

router.get('/login', (req, res) => {
    res.sendFile('templates/login.html', { root: 'public' });
});

router.get('/nosotros', (req, res) => {
    res.sendFile('templates/nosotros.html', { root: 'public' });
});

router.get('/registro', (req, res) => {
    res.sendFile('templates/registro.html', { root: 'public' });
});

module.exports = router;