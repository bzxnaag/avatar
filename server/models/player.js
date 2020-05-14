'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Player extends Model {}

  Player.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Name is required'
        }
      }
    },
    RoomId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(player) {
        player.RoomId = null
      }
    },
    sequelize
  });
  Player.associate = function(models) {
    Player.belongsTo(models.Room)
    // associations can be defined here
  };
  return Player;
};