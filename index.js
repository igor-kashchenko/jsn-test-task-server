const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const ImageKit = require("imagekit");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const superheroRouter = require('./routes/Superheroes');
app.use('/superheroes', superheroRouter);

const uploadImageRouter = require('./routes/ImageUpload');
app.use(uploadImageRouter);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`Server is live!`)
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();