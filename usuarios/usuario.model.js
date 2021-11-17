const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        rut: { type: DataTypes.INTEGER, allowNull: false },
        dv: { type: DataTypes.CHAR, allowNull: false },
        user: { type: DataTypes.STRING, allowNull: false },
        clave: { type: DataTypes.STRING, allowNull: false },
        nombrer: { type: DataTypes.STRING, allowNull: false },
        apellido: { type: DataTypes.STRING, allowNull: false },
        correo: { type: DataTypes.STRING, allowNull: false },
        fecha_nacimiento: { type: DataTypes.STRING, allowNull: false },
        telefono: { type: DataTypes.DATE, allowNull: false },
        nivel: { type: DataTypes.STRING, allowNull: false },
        empresa: { type: DataTypes.DATE, allowNull: true },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false, 
        // defaultScope: {
        //     // exclude password hash by default
        //     attributes: { exclude: ['passwordHash'] }
        // },
        // scopes: {
        //     // include hash with this scope
        //     withHash: { attributes: {}, }
        // }        
    };

    return sequelize.define('usuario', attributes, options);
}