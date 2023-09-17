module.exports = (sequelize, DataTypes) => {
  const Superheroes = sequelize.define("Superheroes", {
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    real_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    superpowers: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    catch_phrase: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Superheroes.associate = (models) => {
    Superheroes.hasMany(models.Images, {
      foreignKey: "superheroId",
      as: "images",
      onDelete: "CASCADE",
    });
  };

  return Superheroes;
};
