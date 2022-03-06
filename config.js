const dotenv = require('dotenv').config();

module.exports = {
  USER: process.env.MONGO_USER,
  PASS: process.env.MONGO_PASS,
  CLUSTER: process.env.MONGO_CLUSTER,
  BD: process.env.MONGO_BD,
  BD2: process.env.MONGO_BD_BACKUP
}