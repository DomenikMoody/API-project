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
      review:"Lorem ipsum dolor sit amet. Nunc accumsan convallis nulla, sit amet bibendum nisl rutrum sed.",
      stars:5,
    },
    {
      spotId:2,
      userId:2,
      review:"Nunc accumsan convallis nulla, sit amet bibendum nisl rutrum sed.",
      stars:3,
    },
    {
      spotId:2,
      userId:4,
      review:"Nunc accumsan convallis nulla, sit amet bibendum nisl rutrum sed.",
      stars:5,
    },
    {
      spotId:4,
      userId:4,
      review:"Nunc accumsan convallis nulla, sit amet bibendum nisl rutrum sed.",
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
