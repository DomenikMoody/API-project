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
      review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tortor felis, tincidunt a purus ac, pulvinar placerat ipsum. Nullam blandit vehicula tempor. Praesent sed eleifend felis. Aenean eu ante sodales leo cursus porta. Fusce a orci ante. Fusce feugiat eleifend pretium. Morbi tempor diam sed velit blandit faucibus.",
      stars:5,
    },
    {
      spotId:2,
      userId:2,
      review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tortor felis, tincidunt a purus ac, pulvinar placerat ipsum. Nullam blandit vehicula tempor. Praesent sed eleifend felis. Aenean eu ante sodales leo cursus porta. Fusce a orci ante. Fusce feugiat eleifend pretium. Morbi tempor diam sed velit blandit faucibus.",
      stars:3,
    },
    {
      spotId:2,
      userId:4,
      review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tortor felis, tincidunt a purus ac, pulvinar placerat ipsum. Nullam blandit vehicula tempor. Praesent sed eleifend felis. Aenean eu ante sodales leo cursus porta. Fusce a orci ante. Fusce feugiat eleifend pretium. Morbi tempor diam sed velit blandit faucibus.",
      stars:5,
    },
    {
      spotId:4,
      userId:4,
      review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tortor felis, tincidunt a purus ac, pulvinar placerat ipsum. Nullam blandit vehicula tempor. Praesent sed eleifend felis. Aenean eu ante sodales leo cursus porta. Fusce a orci ante. Fusce feugiat eleifend pretium. Morbi tempor diam sed velit blandit faucibus.",
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
