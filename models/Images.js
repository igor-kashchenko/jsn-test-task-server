module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define("Images", {
    image_URLS: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  });

  Images.associate = (models) => {
    Images.belongsTo(models.Superheroes, {
      foreignKey: "superheroId",
      as: "superhero",
      onDelete: "CASCADE",
    });
  };

  return Images;
};
