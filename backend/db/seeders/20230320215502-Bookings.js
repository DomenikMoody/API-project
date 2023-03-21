'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId:1,
        userId:4,
        startDate:"2023-12-11",
        endDate: "2024-01-12"
      },
      {
        spotId:2,
        userId:3,
        startDate:"2023-12-11",
        endDate: "2024-01-12"
      },
      {
        spotId:3,
        userId:1,
        startDate:"2023-12-11",
        endDate: "2024-01-12"
      },

    ],{} );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3]}
    }, {});
  }
};
