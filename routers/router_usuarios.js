const router = require('express').Router();
const services_usuarios = require('../services/services_usuarios');

router.post('/user', services_usuarios.registro);


router.get('/userlogin', services_usuarios.login);



module.exports = router;