const dotenv = require("dotenv");
const path = require('path')
const config = {}
dotenv.config({ path: path.join(__dirname, '../../.env')});

config.backend_port = process.env.BACKEND_PORT;
config.db_url = process.env.DB_URI;

module.exports = config;
