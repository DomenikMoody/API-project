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
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-752946155400913372/original/3b1bf9f4-d3e4-4747-a831-fd744b5597ff.jpeg",
        preview:true,
      },
      {
        spotId:1,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-752943099290902616/original/bf84558c-4d72-481c-bde4-161e18a88e85.jpeg",
        preview:false,
      },
      {
        spotId:1,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-752943099290902616/original/bf84558c-4d72-481c-bde4-161e18a88e85.jpeg",
        preview:false,
      },
      {
        spotId:1,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-752943099290902616/original/78c890b4-c32b-42d8-9e44-0c1f63ff8d41.jpeg",
        preview:false,
      },
      {
        spotId:1,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-752943099290902616/original/4f5d5316-ee0d-46b6-8a29-ca44ffd0b879.jpeg",
        preview:false,
      },
      {
        spotId:2,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-771277764937646714/original/aafb611a-fedb-4268-9eb9-86dfaac3bec7.jpeg",
        preview:true,
      },
      {
        spotId:2,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-771277764937646714/original/838cacbe-4c7b-4826-83ce-28cb5cffaf47.jpeg",
        preview:false,
      },
      {
        spotId:2,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-771277764937646714/original/6cd5ce90-5cb6-43f9-945f-cebd35e37b6e.jpeg",
        preview:false,
      },
      {
        spotId:2,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-771277764937646714/original/6281a33e-8a64-466c-9ca6-f5715c60d64e.jpeg",
        preview:false,
      },
      {
        spotId:2,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-771277764937646714/original/a392b0a3-5a06-4b46-8cef-95d5916e48a4.jpeg",
        preview:false,
      },
      {
        spotId:3,
        url:"https://a0.muscache.com/im/pictures/monet/Luxury-711568342821908243/original/88fb55c7-b018-43ff-b0d2-0c9d09e2899d?im_w=1440",
        preview:true,
      },
      {
        spotId:3,
        url:"https://a0.muscache.com/im/pictures/monet/Luxury-711568342821908243/original/706adc83-bfab-4010-b9ef-4d8a5507f239?im_w=1440",
        preview:false,
      },
      {
        spotId:3,
        url:"https://a0.muscache.com/im/pictures/monet/Luxury-711568342821908243/original/1282d735-8acf-441b-820b-737a3ff4f7d0?im_w=1440",
        preview:false,
      },
      {
        spotId:3,
        url:"https://a0.muscache.com/im/pictures/monet/Luxury-711568342821908243/original/64106678-08c0-4ba3-b56c-4e310e862ffd?im_w=1440",
        preview:false,
      },
      {
        spotId:3,
        url:"https://a0.muscache.com/im/pictures/monet/Luxury-711568342821908243/original/528025a3-75df-497b-be13-d5f2c4a5a197?im_w=1440",
        preview:false,
      },
      {
        spotId:4,
        url:"https://a0.muscache.com/im/pictures/f2c57a04-fdba-442f-8167-1e9e4e62ff39.jpg",
        preview:true,
      },
      {
        spotId:4,
        url:"https://a0.muscache.com/im/pictures/2fde1f95-4e27-4e3c-a6d7-8a8ab4440e96.jpg",
        preview:false,
      },
      {
        spotId:4,
        url:"https://a0.muscache.com/im/pictures/4c0b67c6-721e-4413-a2e2-1d2547b98c18.jpg",
        preview:false,
      },
      {
        spotId:4,
        url:"https://a0.muscache.com/im/pictures/b84c0bd2-e23a-40a1-b3be-033ffadaeefb.jpg",
        preview:false,
      },
      {
        spotId:4,
        url:"https://a0.muscache.com/im/pictures/283ddcc4-bf65-46e1-8181-2528b6d71e52.jpg",
        preview:false,
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
