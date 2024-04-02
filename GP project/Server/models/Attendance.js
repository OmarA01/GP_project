module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define("Attendance", {
     AttendenceID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },  
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      IsVIP: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      Phnoe: {
        type: DataTypes.STRING,
      },
      Flight_Number: {
        type: DataTypes.STRING,
      },
      Flight_Date: {
        type: DataTypes.DATE,
      }
    });
  
    Attendance.associate = (models) => {
      Attendance.belongsTo(models.Event, {
          foreignKey: 'ActivityID',
          onDelete: 'CASCADE', 
      });
    };
    return Attendance;
  };