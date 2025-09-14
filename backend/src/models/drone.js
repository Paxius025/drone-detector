const { Sequelize, DataTypes, Model } = require('sequelize');
const path = require('path');

// สร้าง Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite') 
});

// Define Drone model
class Drone extends Model {}
Drone.init({
  class: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  confidence: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  datetime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}, { 
  sequelize, 
  modelName: 'drone',
  timestamps: false
});

// Sync models
sequelize.sync();

module.exports = { Drone, sequelize };
