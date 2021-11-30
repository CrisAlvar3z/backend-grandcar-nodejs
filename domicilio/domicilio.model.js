const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    
    const attributes = {
        direccion: { type: DataTypes.STRING, allowNull: false },
    };
    
    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,       
    };

    return sequelize.define('domicilio', attributes, options);
}