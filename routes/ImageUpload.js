const express = require('express');
const router = express.Router();
const upload = require('../multer/index');
const { uploadFile } = require('../controllers/imageUploadController'); 


router.post('/upload-images', upload.array('file'), async (req, res) => {
  const files = req.files;

  if (!files) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  const uploadPromises = files.map(async (file) => {
    return uploadFile(file);
  });

  try {
    const uploads = await Promise.all(uploadPromises);

    const successfulUploads = uploads.filter((upload) => upload !== null);

    res.json(successfulUploads);
  } catch (error) {
    res.status(500).send('An error occurred during file uploads.');
  }
});

module.exports = router;