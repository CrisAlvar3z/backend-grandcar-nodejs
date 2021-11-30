const config = require('config.json');
const { Op } = require('sequelize');
const db = require('_helpers/db');

module.exports = {
    getAllVehiculos,
    getById,
};

async function getAllVehiculos() {
    const vehiculos = await db.Vehiculo.findAll();
    return vehiculos.map(x => basicDetails(x));
}

async function getById(id) {
    const vehiculos = await db.Vehiculo.findByPk(id);
    return vehiculos;
}


function basicDetails(vehiculo) {
    const { id, marca, modelo, anio, descripcion, precio_por_dia, img_url, disponibilidad } = vehiculo;
    return { id, marca, modelo, anio, descripcion, precio_por_dia, img_url, disponibilidad };
}

//async function getById(id) {
//    const account = await getAccount(id);
//    return basicDetails(account);
//}

