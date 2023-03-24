'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
    {
      spotId:1,
      userId:1,
      review:"This place is really nice",
      stars:5,
    },
    {
      spotId:1,
      userId:2,
      review:"This place is Ok",
      stars:3,
    },
    {
      spotId:2,
      userId:3,
      review:"This place is really nice",
      stars:5,
    }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3] }
    }, {});
  }
};
