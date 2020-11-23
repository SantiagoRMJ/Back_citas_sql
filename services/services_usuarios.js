const { Usuario, Citas} = require('../models/index');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        res.send({message: 'Usuario eliminado correctamente'})
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Ha habido un problema al borrar el usuario'});
    }
};

exports.login = async (req, res)=>{
    try{
    const{nombre, pass} = req.body;
    if(!nombre|| !pass) return res.json({error: 'faltan datos'});
    const data = await Usuario.findAll({ where: {email: req.body.email}});
    console.log(data)
    if(!data) return res.json({error: 'ningún usuario coincide con tu usuario y contraseña'});
    return data;
    }catch(error){
        console.error(error);
        res.status.send({message: 'Ha ocurrido un problema con el login'})
    }
};



