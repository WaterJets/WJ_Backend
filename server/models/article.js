'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('article', {//TODO:upercase here
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      title: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      content: {
          type: DataTypes.TEXT,
          allowNull: false,
      },
      description: {
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
      Article.belongsTo(models.Author, {
          foreignKey: 'authorId',
          onDelete: 'CASCADE',
      })
  };
  return Article;
};