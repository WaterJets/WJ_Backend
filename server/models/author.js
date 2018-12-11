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
      freezeTableName: true
  });
  Author.associate = function(models) {
      Author.hasMany(models.article, {//TODO: article upercase here
          as: 'article',
          foreignKey: 'authorId'
      })
  };
  return Author;
};
