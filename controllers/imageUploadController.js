const imagekit = require('../imagekit/index');

const uploadFile = async (file) => {
  const fileData = {
    file: file.buffer,
    fileName: file.originalname,
    folder: 'super-heroes',
  };

  try {
    const result = await new Promise((resolve, reject) => {
      imagekit.upload(fileData, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    const fileId = result.fileId;
    const url = result.url;

    const uploadInfo = { fileId, url };

    return uploadInfo;
  } catch (error) {
    console.error(error);
    return null;
  }
};


module.exports = {
  uploadFile,
};