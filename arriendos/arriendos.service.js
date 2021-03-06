const db = require('_helpers/db');
const vehiculoService = require('../vehiculos/vehiculo.service');
var moment = require('moment');  
const { get } = require('./arriendos.controller');
const { Op } = require('sequelize')

module.exports = {
    getAllArriendos,
    saveArriendo,
    getAllReservedDays
    //getById,
};

async function getAllArriendos() {
    const arriendo = await db.Arriendo.findAll();
    return arriendo.map(x => basicDetails(x));
}

function basicDetails(arriendo) {
    const { id, codigoArriendo, fecha_salida, hora_salida, fecha_retorno, hora_retorno, despacho, direccion_desp, est_despacho } = arriendo;
    return { id, codigoArriendo, fecha_salida, hora_salida, fecha_retorno, hora_retorno, despacho, direccion_desp, est_despacho } ;
}

async function saveArriendo(params) {
    // validate
    // create account object
    const arriendo = new db.Arriendo(params);
    
    const vehiculo = await db.Vehiculo.findByPk(arriendo.vehiculoId);

    var cant_dias = getDates(arriendo.fecha_salida, arriendo.fecha_retorno).length
    console.log(arriendo.nombre_sucursal)
    arriendo.cant_dias = cant_dias;
    arriendo.total = cant_dias*vehiculo.precio_por_dia
    if(params.despacho==false) {
      arriendo.direccion_desp=params.nombre_sucursal
    }
    console.log(arriendo)
    //save arriendo                                                                                                                                                                
    await arriendo.save()

    //send email
    //await sendVerificationEmail(account, origin);
}

async function  getAllReservedDays(id) {

  var date = Date.now();
  const arriendo = await db.Arriendo.findAll({where: {vehiculoId: id, fecha_retorno: {[Op.gte]: date} }});
  return  arriendo.map(x => getDates(new Date(x.fecha_salida), new Date(x.fecha_retorno))).flat();

}


function getDates(startDate, endDate) {
    const dates = []
    let currentDate = startDate
    const addDays = function (days) {
      const date = new Date(this.valueOf())
      date.setDate(date.getDate() + days)
      return date
    }
    while (currentDate <= endDate) {
      //dates.push(moment(currentDate).format('DD/MM/YYYY'))
      dates.push(currentDate)
      currentDate = addDays.call(currentDate, 1)
    }
    return dates 
  }

  
//async function getById(id) {
//    const account = await getAccount(id);
//    return basicDetails(account);
//}

