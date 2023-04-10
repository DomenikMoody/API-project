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
        url:"https://media.istockphoto.com/id/1272163106/photo/large-house-with-steep-roof-and-side-entry-three-car-garage.jpg?s=1024x1024&w=is&k=20&c=WEwH-MlAqCy2kSbnaWf1ZQLHhQJHUT3avWrSacFo3Ls=",
        preview:false
      },
      {
        spotId:2,
        url:"https://media.istockphoto.com/id/1026205392/photo/beautiful-luxury-home-exterior-at-twilight.jpg?s=2048x2048&w=is&k=20&c=T63lnxHB0MLfu5KgKmIba_SKWcReTX1o25gVsqH1M6c=",
        preview:true,
      },
      {
        spotId:3,
        url:"https://media.istockphoto.com/id/1272128530/photo/home-with-blue-siding-and-stone-fa%C3%A7ade-on-base-of-home.jpg?s=2048x2048&w=is&k=20&c=cQtPx5Bukh-wNMEJYaUUb4ZE8iMsiRZn12ZdshdcTEE=",
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
