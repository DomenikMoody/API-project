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
        city:"Anchorage",
        state:"Alaska",
        country: "USA",
        lat: 43,
        lng: 54,
        name: 'Home Away From Home',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tortor felis, tincidunt a purus ac, pulvinar placerat ipsum. Nullam blandit vehicula tempor. Praesent sed eleifend felis. Aenean eu ante sodales leo cursus porta. Fusce a orci ante. Fusce feugiat eleifend pretium. Morbi tempor diam sed velit blandit faucibus.`,
        price: 100.00
      },
      {
        ownerId:3,
        address:"1511 moon dr",
        state:"Maryland",
        city:"Baltimore",
        country:"USA",
        lat:89,
        lng:34,
        name:'Apex',
        description:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tortor felis, tincidunt a purus ac, pulvinar placerat ipsum. Nullam blandit vehicula tempor. Praesent sed eleifend felis. Aenean eu ante sodales leo cursus porta. Fusce a orci ante. Fusce feugiat eleifend pretium. Morbi tempor diam sed velit blandit faucibus.`,
        price: 200.00
      },
      {
        ownerId:1,
        address:"9021 Sun ave",
        state: "Texas",
        city: "Austin",
        country: "USA",
        lat: 12,
        lng: 15,
        name: 'HOT PLACE',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tortor felis, tincidunt a purus ac, pulvinar placerat ipsum. Nullam blandit vehicula tempor. Praesent sed eleifend felis. Aenean eu ante sodales leo cursus porta. Fusce a orci ante. Fusce feugiat eleifend pretium. Morbi tempor diam sed velit blandit faucibus.`,
        price: 400.00
      },
      {
        ownerId:2,
        address:"2020 Star dr",
        state:"Virginia",
        city:"Roanoke",
        country:"USA",
        lat:89,
        lng:34,
        name:'Lunar',
        description:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tortor felis, tincidunt a purus ac, pulvinar placerat ipsum. Nullam blandit vehicula tempor. Praesent sed eleifend felis. Aenean eu ante sodales leo cursus porta. Fusce a orci ante. Fusce feugiat eleifend pretium. Morbi tempor diam sed velit blandit faucibus.`,
        price: 800.00
      },
    ],{} );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Home Away From Home','Apex','HOT PLACE']}
    }, {});
  }
};
