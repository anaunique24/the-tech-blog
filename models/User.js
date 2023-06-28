const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], //setting a min password length
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => { // newUserData is being created and used beacuse of sequelize
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData; //hashing the password so that its not usable
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData; //hashing the password so that its not usable
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true, // testTestTest convert to test_test_test INTERVIEW QUESTION
    modelName: 'user',
  }
);

module.exports = User;