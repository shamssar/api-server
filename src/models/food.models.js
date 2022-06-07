'use strict';

const Food = (Sequelize, DataTypes) => {
  const Food = Sequelize.define('Food', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kind: {
      type: DataTypes.STRING,
    }
  });
  return Food;
}
module.exports = Food;