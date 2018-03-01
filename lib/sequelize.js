const Sequelize = require('sequelize');
const config = require('../config');

const options = process.env.NODE_ENV === 'production' ?  config.get('production') : config.get('development');

let sequelize = new Sequelize('test', null, null, {
    dialect: 'sqlite',
    storage: './database/database.sqlite',
    timestamps: true
});

sequelize
    .authenticate()
    .then(() => {
        console.log('DB connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
