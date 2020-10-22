

module.exports.Users = (sequelize, Sequelize) => {
    return sequelize.define('Users', {
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username:{
         type: Sequelize.STRING,
         unique: true,
         allowNull: false,
        },
      email:{
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
       },
      favorites: Sequelize.STRING,
    });
  };

  module.exports.Problems = (sequelize, Sequelize) => {
      return sequelize.define('Problems', {
        name:{
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        solution_one:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        solution_two:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        solution_three:{
            type: Sequelize.STRING,
            allowNull: false,
        },
      })
  };

  module.exports.Solutions = (sequelize, Sequelize) => {
    return sequelize.define('Added_Solutions', {
      username:{
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'username',
        }
      },
      email:{
       type: Sequelize.STRING,
       allowNull: false,
       references: {
        model: 'Users',
        key: 'email',
      }
      },
      problemID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Problems',
          key: 'name',
        }
      },
      data: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      authorized:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    })
  };