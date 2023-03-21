'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId:1,
        url:"https://www.istockphoto.com/photo/large-house-with-steep-roof-and-side-entry-three-car-garage-gm1272163106-374520133",
        preview:true,
      },
      {
        spotId:2,
        url:"https://www.istockphoto.com/photo/beautiful-luxury-home-exterior-at-twilight-gm1026205392-275220083",
        preview:true,
      },
      {
        spotId:3,
        url:"https://www.istockphoto.com/photo/home-with-blue-siding-and-stone-fa%C3%A7ade-on-base-of-home-gm1272128530-374495892",
        preview:true,
      },
    ],{} );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3]}
    }, {});
  }
};
