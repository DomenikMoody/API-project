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
        url:"https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        reviewId:2,
        url:"https://media.istockphoto.com/id/1026205392/photo/beautiful-luxury-home-exterior-at-twilight.jpg?s=2048x2048&w=is&k=20&c=T63lnxHB0MLfu5KgKmIba_SKWcReTX1o25gVsqH1M6c="
      },
      {
        reviewId:3,
        url:"https://media.istockphoto.com/id/1066000176/photo/beautiful-luxury-home-exterior-at-twilight.jpg?s=612x612&w=is&k=20&c=6L7X_DUIZ-NQEXdbkD5Znr3DFFCmmm4Ql0GbYWp3ggg="
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
