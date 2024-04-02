module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      UserID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      Role: {
        type: DataTypes.ENUM('1', '2', '3', '4', '5', '6'), 
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
    
    User.associate = (models) => {
      User.hasMany(models.Event, {
          foreignKey: 'UserID',
          as: 'createdEvents', 
      });
    };

    return User;
  };