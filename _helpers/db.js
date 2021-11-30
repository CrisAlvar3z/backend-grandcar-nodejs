const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { host: host, dialect: 'mysql' });

    // init models and add them to the exported db object
    db.Vehiculo = require('../vehiculos/vehiculo.model')(sequelize);
    db.Account = require('../accounts/account.model')(sequelize);
    db.Domicilio = require('../domicilio/domicilio.model')(sequelize);
    db.Arriendo = require('../arriendos/arriendos.model')(sequelize);
    db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);

    //define relationships
    db.Account.hasOne(db.Domicilio, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    db.Domicilio.belongsTo(db.Account);
    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);
    db.Account.hasMany(db.Arriendo);
    db.Arriendo.belongsTo(db.Account);
    db.Vehiculo.hasMany(db.Arriendo);
    db.Arriendo.belongsTo(db.Vehiculo);
    // sync all models with database
    await sequelize.sync();
}