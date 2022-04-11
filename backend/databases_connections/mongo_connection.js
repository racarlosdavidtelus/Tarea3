const { MongoClient } = require("mongodb");
const credentials = require('../config/config');

const client = new MongoClient(credentials.mongo.url);

module.exports = client;