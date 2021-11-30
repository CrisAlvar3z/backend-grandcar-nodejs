const db = require('_helpers/db');
const Role = require('_helpers/role');

module.exports = {
    generateDomicilio,
    getByID
};

async function getByID(id) {
    const direccion = await db.Domicilio.findOne({ where: { accountid: id } });
    if (!direccion) throw 'Direccion no encontrada';
    return direccion;    

}

function generateDomicilio(account, direccion) {
    return new db.Domicilio({
        accountId: account,
        direccion: direccion,
    });
}
