'use strict';
require('dotenv').config();

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require('sequelize');

const foodModel = require('./food.models');
const clothesModel = require('./clothes.models');
const Collection = require('./lib/collection');

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ?
    {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    } : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const foodTable = foodModel(sequelize, DataTypes);
const clothesTable = clothesModel(sequelize, DataTypes);

const foodCollection = new Collection(foodTable);
const clothesCollection = new Collection(clothesTable);

module.exports = {
  db: sequelize,
  foodTable: foodCollection,
  clothesTable: clothesCollection,
};