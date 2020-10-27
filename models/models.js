

module.exports.Users = (sequelize, Sequelize) => {
    return sequelize.define('Users', {
      username:{
         type: Sequelize.STRING,
         allowNull: false,
         primaryKey: true,
        },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    })
  }

module.exports.Problems = (sequelize, Sequelize) => {
    return sequelize.define('Problems', {
      name:{
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
      },
    })
  }

module.exports.Solutions = (sequelize, Sequelize) => {
    return sequelize.define('Solutions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      solutionName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        references: {
          model: 'Problems',
          key: 'name',
        }
      },
      username: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'username',
        }
      },
      data: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      authorized: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    })
}

module.exports.Favorites = (sequelize,Sequelize)=>{
  return sequelize.define('Favorites', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    problemID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Solutions',
        key: 'id',
      }
    },
    name: {
      type: Sequelize.STRING,
      references: {
        model: 'Problems',
        key: 'name',
      }
    },
    solutionName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      references: {
        model: 'Users',
        key: 'username',
      }
    },
    data: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    authorized: {
      type: Sequelize.BOOLEAN,
    },
    favoriteUser: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'username',
      },
    },
  })
};



