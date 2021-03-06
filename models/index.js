'use strict'; 

const fs        = require('fs'); 
const path      = require('path'); 
const Sequelize = require('sequelize'); 
const basename  = path.basename(__filename); 
const env       = process.env.NODE_ENV || 'development'; 
const config    = require(__dirname + '/../config/config.json')[env]; 
let db        = {}; 

if (config.use_env_variable) { 
 var sequelize = new Sequelize(process.env[config.use_env_variable], config); 
} else { 
 var sequelize = new Sequelize('main', null, null, {
     dialect: 'sqlite',
     storage: './database/database.sqlite',
     timestamps: true
 });
} 

fs 
 .readdirSync(__dirname) 
 .filter(file => { 
   return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'); 
 }) 
 .forEach(file => { 
   const model = sequelize['import'](path.join(__dirname, file)); 
   db[model.name] = model; 
 }); 

Object.keys(db).forEach(modelName => { 
 if (db[modelName].associate) { 
   db[modelName].associate(db); 
 } 
}); 

db.sequelize = sequelize; 
db.Sequelize = Sequelize; 

module.exports = db; 
