module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define("Event", {
      ActivityID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Type: {
        type: DataTypes.ENUM('1', '2', '3', '4', '5', '6', '7'), //1 (accepted), 2 (vice president), 3 (administration manager), 4(Tala), 5 (direct manager), 6 (rejected), 7 (finished)
        allowNull: false,
      },
      ActivityName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Organizer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DateOfEvent: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      StartTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      FinishTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      NumberOfAudience: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      FinancingValue: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      FinancingEntity: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });

    Event.associate = (models) => {
      Event.hasOne(models.Report, {
        foreignKey: 'EventID',
        onDelete: 'CASCADE',
        as: 'report',
      });

      Event.hasMany(models.Attendance, {
        foreignKey: 'ActivityID',
        onDelete: 'CASCADE',
        as: 'attendances', 
    });

    Event.belongsTo(models.User, {
      foreignKey: 'UserEmail',
      onDelete: 'CASCADE', 
    });

    Event.belongsToMany(models.Room, { through: 'EventRoom' });

    };

    return Event;
  };