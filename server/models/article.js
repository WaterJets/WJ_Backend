'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('article', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      author: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      title: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      message: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      header: {
          type: DataTypes.STRING,
          allowNull: false,
      },
  }, {
      freezeTableName: true
  });
  Article.associate = function(models) {
  };
  return Article;
};