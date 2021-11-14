'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      make: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      colour: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      wordsSimilarToMake: {
        type: Sequelize.STRING,
        allowNull: true,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cars');
  }
};