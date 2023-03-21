'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId:4,
        address: "1616 love st",
        city:"anchorage",
        state:"Alaska",
        country: "USA",
        lat: null,
        lng: null,
        name: 'Home Away From Home',
        description: 'its all in the name my guy',
        price: 50.00
      },
      {
        ownerId:3,
        address:"1511 moon dr",
        state:"Maryland",
        city:"Baltimore",
        country:"USA",
        lat:null,
        lng:null,
        name:'APEX HOUSE',
        description: 'when the legends stay',
        price: 150.00
      },
      {
        ownerId:1,
        address:"9021 sun ave",
        state: "texas",
        city: "austin",
        country: "USA",
        lat: null,
        lng: null,
        name: 'HOT PLACE',
        description: 'HOTEST PLACE ON EARTH',
        price: 200.00
      },
    ],{} );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Home Away From Home','APEX HOUSE','HOT PLACE']}
    }, {});
  }
};
