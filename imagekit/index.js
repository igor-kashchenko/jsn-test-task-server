const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMG_STORE_PUBLIC_KEY,
  privateKey: process.env.IMG_STORE_PRIVATE_KEY,
  urlEndpoint: process.env.IMG_STORE_ENDPOINT,
});

module.exports = imagekit;