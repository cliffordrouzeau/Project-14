const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/config');

class User extends Model {

  checkPassword(currentPassword) {
    return bcrypt.compareSync(currentPassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" 
      beforeCreate: async (newUserPass) => {
        newUserPass.password = await bcrypt.hash(newUserPass.password, 10);
        return newUserPass;
      },
      beforeUpdate: async (updatedUserPass) => {
        updatedUserPass.password = await bcrypt.hash(updatedUserPass.password, 10);
        return updatedUserPass;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'User'
  }
);

module.exports = User;
