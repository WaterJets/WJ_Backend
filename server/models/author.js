'use strict';
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
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
    }
  }, {});
  Author.associate = function(models) {
      Author.hasMany(models.article, {//TODO: article upercase here
          as: 'article',
          foreignKey: 'authorId'
      })
  };
  return Author;
};