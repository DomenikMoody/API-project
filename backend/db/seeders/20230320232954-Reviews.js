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
      review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod elit id urna dictum tempor. Proin quis nisi justo. Integer in congue purus, a fringilla lorem. Aliquam iaculis id nisl viverra congue. Nunc eget massa volutpat, malesuada arcu id, consequat nibh. Maecenas metus arcu, laoreet vehicula euismod ac, fermentum vitae nulla. Nunc suscipit posuere convallis.",
      stars:5,
    },
    {
      spotId:2,
      userId:2,
      review:"Nunc accumsan convallis nulla, sit amet bibendum nisl rutrum sed. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis laoreet at sapien quis faucibus. Donec sed enim et libero cursus vehicula vitae nec elit. Pellentesque et tortor enim. Curabitur blandit tempus metus vel pulvinar. Curabitur ultrices mauris diam. Sed maximus pellentesque magna, id interdum eros dignissim vitae. Aliquam a est feugiat, rhoncus nibh eu, eleifend sem. Morbi pulvinar at ex sed dignissim.",
      stars:3,
    },
    {
      spotId:2,
      userId:4,
      review:"Nunc accumsan convallis nulla, sit amet bibendum nisl rutrum sed. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis laoreet at sapien quis faucibus. Donec sed enim et libero cursus vehicula vitae nec elit. Pellentesque et tortor enim. Curabitur blandit tempus metus vel pulvinar. Curabitur ultrices mauris diam. Sed maximus pellentesque magna, id interdum eros dignissim vitae. Aliquam a est feugiat, rhoncus nibh eu, eleifend sem. Morbi pulvinar at ex sed dignissim.",
      stars:5,
    },
    {
      spotId:4,
      userId:4,
      review:"Nunc accumsan convallis nulla, sit amet bibendum nisl rutrum sed. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis laoreet at sapien quis faucibus. Donec sed enim et libero cursus vehicula vitae nec elit. Pellentesque et tortor enim. Curabitur blandit tempus metus vel pulvinar. Curabitur ultrices mauris diam. Sed maximus pellentesque magna, id interdum eros dignissim vitae. Aliquam a est feugiat, rhoncus nibh eu, eleifend sem. Morbi pulvinar at ex sed dignissim.",
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
