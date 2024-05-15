module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define("Report", {
      EventID: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         references: {
             model: 'Events', 
             key: 'ActivityID'       
         }
     },
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
          foreignKey: 'EventID',
          onDelete: 'CASCADE',
          as: 'Event' 
      });

      Report.hasMany(models.Image, {
         foreignKey: 'reportId'
     });
     
    };
    
    return Report;
  };