'use strict';

const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

let connection;

async function connectDB() {
  if (connection) return connection.db();

  let client;
  try {
    client = new MongoClient(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection = await client.connect();
  } catch (error) {
    console.error('Could not connect to db', mongoUrl, error);
    process.exit(1);
  }

  return connection.db();
}

module.exports = connectDB;
