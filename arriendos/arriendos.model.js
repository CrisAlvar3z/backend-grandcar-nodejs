const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        codigoArriendo: { type: DataTypes.STRING, allowNull: true },
        fecha_salida: { type: DataTypes.DATE, allowNull: false },
        hora_salida: { type: DataTypes.TIME, allowNull: false },
        fecha_retorno: { type: DataTypes.DATE, allowNull: false },
        hora_retorno: { type: DataTypes.TIME, allowNull: false,  defaultValue: '20:00' },
        cant_dias: { type: DataTypes.INTEGER, allowNull: true },
        total: { type: DataTypes.INTEGER, allowNull: true },
        despacho: { type: DataTypes.BOOLEAN, allowNull: true },
        direccion_desp: { type: DataTypes.STRING, allowNull: true },
        est_despacho: { type: DataTypes.STRING, allowNull: false , defaultValue: 'Solicitud Ingresada'},
    };
    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,       
    };
    return sequelize.define('arriendo', attributes, options);
}