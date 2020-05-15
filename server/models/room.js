'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Room extends Model {}

  Room.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Name is required'
        }
      }
    }
  }, {
    sequelize
  });
  Room.associate = function(models) {
    Room.hasMany(models.Player)
    // associations can be defined here
  };
  return Room;
};