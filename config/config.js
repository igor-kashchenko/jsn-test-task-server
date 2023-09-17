require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "jsn_storage_user",
    "password": "6gqwe3LUsnCcZfBXztA1o47LOUJ1Q2QS",
    "database": "jsn_storage",
    "host": "dpg-ck3mornqj8ts73fs2t00-a",
    "dialect": "postgres"
  }
}
  
