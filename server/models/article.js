'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('article', {//TODO:upercase here or not :O
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
      },
  }, {
      freezeTableName: true
  });
  Article.associate = function(models) {
      Article.belongsTo(models.author, {
          foreignKey: 'authorId',
          onDelete: 'CASCADE',
      })
  };
  return Article;
};