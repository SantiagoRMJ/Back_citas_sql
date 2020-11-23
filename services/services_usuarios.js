const {Usuario} = require('../models/index');
const bcrypt = require('bcryptjs')
const usuario = require('../models/usuario');
const jwt = require('jwt-simple')
const moment = require('moment')
const SECRET_KEY = "jkfbas88nadssbanw23ADSF"

createToken = (usuario) =>{
    const payLoad = {
        id: usuario._id,
        nombre: usuario.nombre,
        pass: usuario.pass,
        email: usuario.email,
        role: usuario.rol,
        createToken: moment().unix(),
        exp: moment().add(3, "hours").unix()
    }   
    return jwt.encode(payLoad, SECRET_KEY)
}
exports.registro = async (req, res) => {
    req.body.pass = bcrypt.hashSync(req.body.pass, 3);
    try {
        const nuevoUsuario = await Usuario.create({
            nombre: req.body.nombre,
            pass: req.body.pass,
            email: req.body.email,
            rol: req.body.rol
        });
        res.json({nuevoUsuario})
        res.send({message: 'Usuario creado correctamente'});
    } catch (error) {
        console.error(error);
        console.log(req.body)
        res.status(500).send({message: 'El usuario no ha podido crearse correctamente'});
    }
};

exports.mostrarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json({usuarios});
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Ha habido un problema tratando de recuperar los usuarios'});
    }
};

exports.eliminarUsuario = async (req, res) => {
    try {
        const email = await Usuario.destroy({where: {email: req.body.email}});
        if (!email) return res.status(400).send({message: 'Email no encontrado'});
        res.status(200).send({message: 'Usuario eliminado correctamente'})
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Ha habido un problema al borrar el usuario'});
    }
};

exports.login = async (req, res)=>{
    try{
    const nombre = req.body.nombre;
    let data = await Usuario.findOne({ where: {email: req.body.email}});
    const pass =  bcrypt.compareSync(req.body.pass, data.pass);
    console.log(data.pass)
    console.log(pass)
    if(!nombre|| pass === null) return res.json({error: 'faltan datos'});
    if(!data || pass === false) return res.json({error: 'ningún usuario coincide con tu usuario y contraseña'});
    else res.status(200).json({sucess: "usuario logeado correctamente", success: createToken(data)})
    return data;
    }catch(error){
        console.error(error);
        res.status(500).send({message: 'Ha ocurrido un problema con el login'})
    }
};

