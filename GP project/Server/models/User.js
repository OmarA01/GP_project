module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      Role: {
        type: DataTypes.ENUM('1', '2', '3', '4', '5','6', '7'), //1 (admin), 2 (vice president), 3 (administration manager), 4(Tala), 5 (direct manager), 6 (employee), 7 (Financial Manager)
        allowNull: false,
      },
      UserName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        primaryKey: true,
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
      ManagerEmail: {
        type: DataTypes.STRING,
      }
    });
    
    User.associate = (models) => {
      User.hasMany(models.Event, {
          foreignKey: 'UserEmail',
          as: 'createdEvents', 
      });
    };
    
    User.belongsTo(User, { as: 'Manager', foreignKey: 'ManagerEmail', targetKey: 'Email' });

    return User;
  };