const {Citas} = require('../models/index');
const sequelize = require('../models/index.js');


exports.crearCita = async (req, res) => {
    try {
        const nuevaCita = await Citas.create({
            UsuarioId: req.body.UsuarioId,
            fecha: req.body.fecha,
            emailPaciente: req.body.emailPaciente,
            id_doctor: req.body.id_doctor,
            observaciones: req.body.observaciones
        });
        return res.json({message: 'Cita creada correctamente', nuevaCita: nuevaCita});
        
    } catch (error) {
        res.status(500).send({message: 'La cita no ha podido crearse correctamente'});
    }
};

exports.listarCitasUsuario = async (req, res) => {
    try {
        const citas = await Citas.findAll({where:{emailPaciente: req.query.emailPaciente}});
        res.json({citas});
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Ha habido un problema tratando de recuperar las citas'});
    }
};

exports.listarCitas = async (req, res) =>{
    const citas = await Citas.findAll()
    res.json({citas})
       
}

exports.cancelarCita = async (req, res) => {
    try {
        let fecha = await Citas.findOne({ where: {fecha: req.body.fecha}});
        if (!fecha) return res.status(400).send({message: 'No se ha eliminado ninguna cita'});
        await Citas.destroy({ where: {fecha: req.body.fecha}});
        return res.status(200).send({message: 'Cita eliminada correctamente'})
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Ha habido un problema al borrar la cita'});
    }
};
