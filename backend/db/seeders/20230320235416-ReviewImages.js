'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId:1,
        url:"https://www.pexels.com/photo/kitchen-with-furniture-and-appliances-2724748/"
      },
      {
        reviewId:2,
        url:"https://www.pexels.com/photo/interior-design-of-a-house-1571460/"
      },
      {
        reviewId:3,
        url:"https://www.pexels.com/photo/empty-living-room-2251247/"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1,2,3] }
    }, {});
  }
};
