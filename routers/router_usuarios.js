const router = require('express').Router();
const services_usuarios = require('../services/services_usuarios');

router.post('/registro', services_usuarios.registro);
router.get('/' ,services_usuarios.mostrarUsuarios)
router.delete('/', services_usuarios.eliminarUsuario)
router.post('/login', services_usuarios.login);



module.exports = router;