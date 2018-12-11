'use strict';


module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('author', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  }, {
      // hooks: {
      //     beforeCreate: (user) => {
      //         const salt = bcrypt.genSaltSync();
      //         user.password = bcrypt.hashSync(user.password, salt);
      //     }
      // },
      freezeTableName: true
  });
  Author.associate = function(models) {
      Author.hasMany(models.article, {//TODO: article upercase here
          as: 'article',
          foreignKey: 'authorId'
      })
  };
    // // Author.prototype.validPassword = function(password) {
    // //     return bcrypt.compareSync(password, this.password);
    // }
  return Author;
};