const dbConfig = require("../config/db.config.js");

const {Sequelize, Datatype} = require('sequelize');
 
// const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
//   operatorsAliases: false,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle  
//   }
});



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.departements = require('./departementModel.js')(sequelize, Datatype);
db.users = require('./userModel.js')(sequelize, Datatype);

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes sync')
})

module.exports = db;




// Departements.hasMoney(User)
// User.belongsTO(Departements)
