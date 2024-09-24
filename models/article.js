module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('Article', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  
    Article.associate = (models) => {
      Article.hasMany(models.Comment, {
        foreignKey: 'articleId',
        as: 'comments'
      });
    };
  
    return Article;
  };