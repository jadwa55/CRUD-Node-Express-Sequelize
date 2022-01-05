const dbConfig = require('../config/dbConfig');
const Sequelize = require('sequelize');
const departementModel = require('./departementModel');
const userModel = require('./userModel');
const con = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});


const Departement = departementModel(con, Sequelize);
const User = userModel(con, Sequelize);

Departement.hasMany(User)
User.belongsTo(Departement)

con.sync({ force: false })
.then(() => {
    console.log('yes sync')
})
 
module.exports = {
    Departement,
    User
};