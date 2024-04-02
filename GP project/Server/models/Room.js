module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define("Room", {
     RoomID: {
        type: DataTypes.STRING,
        primaryKey: true,
     },
     Location: {
        type: DataTypes.STRING,
        allowNull: false,
     },
     Capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
     }
     
    });
   Room.associate = (models) => {
        Room.belongsToMany(models.Event, { through: 'EventRoom' });
   };
    return Room;
  };