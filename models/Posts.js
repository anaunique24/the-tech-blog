const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const { Post } = require('.');

class Posts extends Model {}

Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    posts_data: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    posts_name: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user', //whatever you name the model name/ table name it needs to match here to work
          key: 'id',
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'posts',
    }
  );
  
  module.exports = Posts;