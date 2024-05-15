module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("Image", {
        imageData: {
            type: DataTypes.BLOB,
            allowNull: false
        }
    });

    Image.associate = (models) => {
        Image.belongsTo(models.Report, {
            foreignKey: {
                name: 'reportId',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
    };

    return Image;
};