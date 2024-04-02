module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define("Report", {
     Event_Duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
     },
     NumberOfAttendence: {
        type: DataTypes.INTEGER,
        allowNull: false,
     },
     Evaluation: {
        type: DataTypes.STRING,
        allowNull: false,
     }
    });
    Report.associate = (models) => {
      Report.belongsTo(models.Event, {
          foreignKey: 'ActivityID',
          onDelete: 'CASCADE', 
      });
    };
    return Report;
  };