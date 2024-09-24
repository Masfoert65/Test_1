module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      text: {
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
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.Article, {
        foreignKey: 'articleId',
        as: 'article'
      });
    };
  
    return Comment;
  };
  