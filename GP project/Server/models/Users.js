module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      First_Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Second_Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Department: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ManagerID: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    return Users;
  };