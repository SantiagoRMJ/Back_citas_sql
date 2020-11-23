const moment = require('moment')
const jwt =require('jwt-simple')
const SECRET_KEY = "jkfbas88nadssbanw23ADSF"



exports.validarToken = (req, res, next) => {
    if(!req.headers['user-token']) return res.json({ error: 'Necesitas incluir el user-token en la cabecera'})
    const userToken = req.headers['user-token'];
    let payload = {}
    try {
        payload = jwt.decode(userToken, SECRET_KEY);
    } catch (error) {
        return res.json({ error: 'El token es incorrecto'});
    }
    if (payload.expiredAt < moment().unix()) return res.json({error: 'El token ha expirado'});
    req.usuarioId = payload.usuarioId;
    next();
}