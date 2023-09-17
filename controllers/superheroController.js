const { Superheroes, Images } = require("../models");
const imagekit = require("../imagekit/index");

const getAll = async (req, res) => {
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);

  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  const superheroes = await Superheroes.findAll({
    include: [
      {
        model: Images,
        as: "images",
        attributes: ["image_URLS"],
      },
    ],
    order: [["id", "ASC"]],
  });

  const paginatedHeroes = superheroes.slice(startIndex, endIndex);

  const totalPages = Math.ceil(superheroes.length / pageSize);

  res.json({ superheroes: paginatedHeroes, totalPages });
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const superhero = await Superheroes.findByPk(id, {
    include: [
      {
        model: Images,
        as: "images",
        attributes: ["image_URLS"],
      },
    ],
  });

  res.json(superhero);
};

const addImages = async (req, res) => {
  try {
    const { id } = req.params;
    const { urls } = req.body;

    const superhero = await Superheroes.findByPk(id);

    if (!superhero) {
      return res.status(404).json({ message: "Superhero not found" });
    }

    const newImage = await Images.create({
      image_URLS: urls,
      superheroId: superhero.id,
    });

    res.status(201).json({ message: "Image created successfully", newImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addHero = async (req, res) => {
  const superhero = req.body;

  try {
    const createdHero = await Superheroes.create(superhero);
    res.status(201).json(createdHero);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the hero" });
  }
};

const deleteHero = async (req, res) => {
  const { id } = req.params;

  try {
    const superhero = await Superheroes.findOne({
      where: { id },
      include: [{  model: Images, as: "images", attributes: ["image_URLS"] }],
    });

    if (superhero.images.length > 0) {
      const imageIds = superhero.images[0].image_URLS.map((imageUrl) => {
        const parsedUrl = JSON.parse(imageUrl);
        return parsedUrl.fileId;
      });

      await new Promise((resolve, reject) => {
        imagekit.bulkDeleteFiles(imageIds, function (error, result) {
          if (error) {
            console.log(error);
            reject('Error deleting images from ImageKit');
          } else {
            resolve();
          }
        });
      });
    }

    await Superheroes.destroy({where: {
      id
    }})

    res.send('Success');
  } catch (error) {
    console.log(error);
  }
};

const editHero = async (req, res) => {
  const { id } = req.params;

  const superhero = await Superheroes.findOne({
    where: { id },
  });

  if (!superhero) {
    return res.status(404).send('Superhero not found');
  }

  const updatedValues = req.body;

  await superhero.update(updatedValues);

  res.send('success')
}

module.exports = {
  superheroController: {
    getAll,
    getOne,
    addHero,
    addImages,
    deleteHero,
    editHero,
  },
};
