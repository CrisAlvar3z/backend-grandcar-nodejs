const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        marca: { type: DataTypes.STRING, allowNull: false },
        modelo: { type: DataTypes.STRING, allowNull: false },
        anio: { type: DataTypes.INTEGER, allowNull: false },
        descripcion: { type: DataTypes.STRING, allowNull: false },
        precio_por_dia: { type: DataTypes.INTEGER, allowNull: false },
        img_url: { type: DataTypes.STRING, allowNull: false },
        disponibilidad: { type: DataTypes.BOOLEAN }
    };
    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,       
    };
    return sequelize.define('vehiculo', attributes, options);
}