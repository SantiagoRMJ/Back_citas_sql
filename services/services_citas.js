const citas = require('../models/citas.js');
const sequelize = require('../models/index.js');

exports.crearCita = async (req, res) =>{
    let citas = await citas.create({
        id_usuario: req.body.id_usuario,
        fecha: moment().format("MMM Do YY"),
        id_doctor: req.body.id_doctor,
        descripcion: req.body.descripcion      
    })

    return (citas => res.json(citas)) 
    
}
exports.listarCitas = async (req, res) =>{
    await sequelize.findAll(citas => res.json(citas))
    return citas
}

exports.cancelarCita = async(req, res) =>{
    await citas.destroy({
        where: {
            id: req.body.id_usuario
        }
    })   
    await sequelize.query(`DELETE FROM CITAS WHERE id_cliente = ${id}`, {type: sequelize.QueryTypes.DELETE})
    return (citas => res.json(citas))  
}