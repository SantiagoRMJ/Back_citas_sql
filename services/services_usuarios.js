const {sequelize, Usuario, Citas} = require('../models/index');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.registro = async (req, res) =>{
    let user = await Usuario.create(req.body)
    console.log('patata')
    res.json(user); 
};

exports.login = async (req, res)=>{
    const{user, password} = req.body;
    if(!user || !password) return res.json({error: 'faltan datos'});
    const data = await users.find(e => e.user === user && e.password === password);
    if(!data) return res.json({error: 'ningún usuario coincide con tu usuario y contraseña'});
    return data;
};

   

