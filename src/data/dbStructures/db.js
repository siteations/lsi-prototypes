var Sequelize = require('sequelize');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/lsi';
var db = new Sequelize( connectionString , {logging:false});

module.exports = db;
