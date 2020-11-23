const router = require('express').Router();
const service_citas = require('../services/services_citas');
const validarToken = require('../services/services_usuarios')

router.get('/', service_citas.listarCitas);
router.delete('/', service_citas.cancelarCita);
router.post('/crear',  service_citas.crearCita);
router.get('/miscitas', service_citas.listarCitasUsuario)

module.exports = router;