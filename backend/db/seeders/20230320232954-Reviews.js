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
        spotId: 1,
        userId: 2,
        review: "Amazing spot with stunning views. The interior design is top-notch and the amenities are great. Highly recommend!",
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: "Had a fantastic time at this spot. The location is perfect and the host was very accommodating. Will definitely come back again!",
        stars: 4
      },
      {
        spotId: 2,
        userId: 1,
        review: "This spot exceeded all expectations. The attention to detail in the decor is impressive. Will definitely recommend to friends and family!",
        stars: 5
      },
      {
        spotId: 3,
        userId: 4,
        review: "Lovely spot with a cozy atmosphere. The surrounding area is full of great restaurants and shops. Enjoyed my stay!",
        stars: 4
      },
      {
        spotId: 4,
        userId: 2,
        review: "Absolutely loved this spot. The penthouse offers breathtaking views of the city. The host was very helpful and responsive. Would stay here again!",
        stars: 5
      },
      {
        spotId: 5,
        userId: 3,
        review: "Perfect spot for a relaxing getaway. The villa is beautifully decorated and the pool is amazing. Highly recommend for a luxurious vacation!",
        stars: 5
      },
      {
        spotId: 6,
        userId: 1,
        review: "Had a wonderful time at this cozy hideaway. The location is great and the host provided excellent recommendations for local attractions. Will definitely come back!",
        stars: 4
      },
      {
        spotId: 7,
        userId: 4,
        review: "A charming apartment with a lot of character. The historic building adds to the experience. Enjoyed exploring the nearby landmarks!",
        stars: 4
      },
      {
        spotId: 8,
        userId: 3,
        review: "The mountain retreat was the perfect escape. The surrounding nature is breathtaking and the cabin is cozy and comfortable. Will definitely return!",
        stars: 5
      },
      {
        spotId: 9,
        userId: 2,
        review: "This vintage bungalow is a hidden gem. The retro decor is charming and the location is ideal for exploring Austin. Loved every minute of my stay!",
        stars: 5
      },
      {
        spotId: 10,
        userId: 1,
        review: "Couldn't have asked for a better beachfront haven. The views are spectacular and the amenities are luxurious. Will definitely be back!",
        stars: 5
      },
      {
        spotId: 11,
        userId: 4,
        review: "The modern loft was stylish and comfortable. The rooftop terrace offers stunning views of the city. Highly recommend for a chic city stay!",
        stars: 4
      },
      {
        spotId: 12,
        userId: 3,
        review: "Enjoyed my stay at this urban retreat. The location is convenient and the balcony provides a great view of the city. Would recommend to others!",
        stars: 4
      },
      {
        spotId: 13,
        userId: 2,
        review: "Had a fantastic time at this spacious ranch. The outdoor activities available were fantastic. Perfect for a family vacation!",
        stars: 5
      },
      {
        spotId: 14,
        userId: 1,
        review: "The treehouse exceeded all expectations. It was a unique and memorable experience. Loved being surrounded by nature!",
        stars: 5
      },
      {
        spotId: 15,
        userId: 3,
        review: "The cozy cabin was the perfect getaway. The fireplace added a nice touch and the surroundings were peaceful. Will definitely return!",
        stars: 4
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  }
};
