module.exports = (sequelize, DataTypes) => {
    const Events = sequelize.define("Events", {
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Organizert: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DateOfEvent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Events;
  };