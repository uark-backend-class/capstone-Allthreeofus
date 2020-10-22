const dotenv = require('dotenv').config();
const Sequelize = require('sequelize').Sequelize;
const Model = require('./models/models');

const sequelize = new Sequelize(process.env.DB_CONNECTION);


const User = Model.Users(sequelize, Sequelize);
const Problem = Model.Problems(sequelize, Sequelize);
const Solution = Model.Solutions(sequelize, Sequelize);

sequelize.sync({force: true}).then(() => console.log("Tables are created."));


module.exports = {
    User,
    Problem,
    Solution,
};