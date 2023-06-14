'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Maple St',
        city: 'Los Angeles',
        state: 'California',
        country: 'USA',
        lat: 34,
        lng: -118,
        name: 'Cozy Cottage',
        description: 'Escape to this charming cottage nestled in the heart of Los Angeles. With its tranquil surroundings and cozy interior, it offers the perfect retreat for relaxation. Unwind in the lush garden, enjoy a cup of tea on the private patio, or explore the nearby attractions.',
        price: 150.00
      },
      {
        ownerId: 2,
        address: '456 Oak St',
        city: 'New York',
        state: 'New York',
        country: 'USA',
        lat: 40,
        lng: -73,
        name: 'City Loft',
        description: 'Experience the vibrant energy of New York City in this stylish loft. Located in the heart of Manhattan, it offers modern amenities, breathtaking views, and convenient access to the city\'s attractions. Whether you\'re here for business or leisure, this is the perfect urban oasis.',
        price: 200.00
      },
      {
        ownerId: 3,
        address: '789 Pine St',
        city: 'Chicago',
        state: 'Illinois',
        country: 'USA',
        lat: 41,
        lng: -87,
        name: 'Skyline View',
        description: 'Indulge in luxury living with stunning views of the Chicago skyline. This elegant apartment features upscale furnishings, state-of-the-art amenities, and a prime location in the city center. Immerse yourself in the vibrant culture, explore world-class dining and shopping, and make unforgettable memories.',
        price: 180.00
      },
      // Add custom descriptions for the remaining spots
      {
        ownerId: 4,
        address: '987 Elm St',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37,
        lng: -122,
        name: 'Bayfront Retreat',
        description: 'Escape to this serene bayfront retreat in the heart of San Francisco. With panoramic views of the Golden Gate Bridge and the shimmering waters, this spacious house offers a perfect blend of comfort and luxury. Relax in the private garden, soak in the hot tub, or explore the nearby attractions.',
        price: 250.00
      },
      {
        ownerId: 1,
        address: '258 Walnut St',
        city: 'Miami',
        state: 'Florida',
        country: 'USA',
        lat: 25,
        lng: -80,
        name: 'Tropical Paradise',
        description: 'Experience the ultimate tropical getaway in this luxurious villa in Miami. Surrounded by lush palm trees, crystal-clear pools, and white sandy beaches, it offers a slice of paradise. Enjoy the private cabanas, savor cocktails by the poolside, or embark on thrilling water sports adventures.',
        price: 300.00
      },
      {
        ownerId: 2,
        address: '654 Walnut St',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37,
        lng: -122,
        name: 'Modern Oasis',
        description: 'Discover the epitome of modern luxury in this sleek and sophisticated oasis. Located in the heart of San Francisco, this architectural masterpiece offers breathtaking views, elegant furnishings, and world-class amenities. Immerse yourself in the vibrant city life or relax in the tranquil rooftop garden.',
        price: 280.00
      },
      {
        ownerId: 3,
        address: '753 Pine St',
        city: 'Seattle',
        state: 'Washington',
        country: 'USA',
        lat: 47,
        lng: -122,
        name: 'Pacific Heights Retreat',
        description: 'Experience the best of Seattle in this stunning retreat in the prestigious Pacific Heights neighborhood. Enjoy sweeping views of the city skyline, luxurious interiors, and unparalleled privacy. Indulge in gourmet dining, visit world-renowned museums, or simply unwind in the private jacuzzi.',
        price: 320.00
      },
      {
        ownerId: 4,
        address: '369 Cedar St',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'USA',
        lat: 36,
        lng: -115,
        name: 'Luxury Penthouse',
        description: 'Elevate your Las Vegas experience with this opulent penthouse in the heart of the Strip. With its breathtaking views, lavish amenities, and proximity to world-class entertainment, it offers an unrivaled escape. Indulge in the vibrant nightlife, try your luck at the casinos, or relax in the private spa.',
        price: 400.00
      },
      {
        ownerId: 1,
        address: '987 Elm St',
        city: 'Orlando',
        state: 'Florida',
        country: 'USA',
        lat: 28,
        lng: -81,
        name: 'Enchanted Villa',
        description: 'Step into a fairytale at this enchanting villa nestled in the heart of Orlando. With its whimsical decor, magical gardens, and proximity to theme parks, it offers an unforgettable experience for families and Disney enthusiasts. Embark on thrilling adventures, meet beloved characters, and create lifelong memories.',
        price: 350.00
      },
      {
        ownerId: 2,
        address: '654 Vine St',
        city: 'Nashville',
        state: 'Tennessee',
        country: 'USA',
        lat: 36,
        lng: -86,
        name: 'Music City Hideaway',
        description: 'Immerse yourself in the vibrant music scene of Nashville at this charming hideaway. Located in the heart of the city, it offers a cozy retreat with stylish decor, comfortable furnishings, and a touch of Southern hospitality. Explore iconic music venues, savor delicious local cuisine, or simply relax on the porch and listen to the melodies.',
        price: 180.00
      },
      {
        ownerId: 3,
        address: '753 Oak St',
        city: 'Boston',
        state: 'Massachusetts',
        country: 'USA',
        lat: 42,
        lng: -71,
        name: 'Historic Charm',
        description: 'Experience the rich history of Boston in this charming apartment located in a historic building. With its elegant architecture, period furnishings, and convenient location, it offers a unique glimpse into the city\'s past. Explore the nearby landmarks, stroll along the cobblestone streets, or indulge in the local culinary delights.',
        price: 230.00
      },
      {
        ownerId: 4,
        address: '369 Walnut St',
        city: 'Denver',
        state: 'Colorado',
        country: 'USA',
        lat: 39,
        lng: -104,
        name: 'Mountain Retreat',
        description: 'Escape to the breathtaking Rocky Mountains with this cozy mountain retreat in Denver. Surrounded by pristine nature, it offers a tranquil haven away from the hustle and bustle of the city. Hike scenic trails, ski down powdery slopes, or simply unwind by the fireplace and soak in the serene ambiance.',
        price: 260.00
      },
      {
        ownerId: 1,
        address: '987 Maple St',
        city: 'Austin',
        state: 'Texas',
        country: 'USA',
        lat: 30,
        lng: -97,
        name: 'Vintage Bungalow',
        description: 'Step back in time with this charming vintage bungalow in the heart of Austin. With its retro decor, cozy atmosphere, and convenient location, it offers a nostalgic retreat. Explore the vibrant music scene, savor Tex-Mex cuisine, or simply relax on the porch and soak in the laid-back vibes of the city.',
        price: 210.00
      },
      {
        ownerId: 2,
        address: '654 Cedar St',
        city: 'San Diego',
        state: 'California',
        country: 'USA',
        lat: 32,
        lng: -117,
        name: 'Beachfront Haven',
        description: 'Experience the ultimate beach getaway at this stunning haven in San Diego. With its prime beachfront location, panoramic ocean views, and luxurious amenities, it offers a slice of paradise. Soak up the sun on the private terrace, take a refreshing dip in the infinity pool, or enjoy a leisurely stroll along the sandy shores.',
        price: 380.00
      },
      {
        ownerId: 3,
        address: '753 Elm St',
        city: 'Austin',
        state: 'Texas',
        country: 'USA',
        lat: 30,
        lng: -97,
        name: 'Modern Loft',
        description: 'Immerse yourself in contemporary luxury at this modern loft in Austin. With its sleek design, state-of-the-art amenities, and prime location, it offers the perfect blend of style and convenience. Explore the vibrant nightlife, dine at award-winning restaurants, or simply relax on the rooftop terrace and enjoy the city skyline.',
        price: 290.00
      },
      {
        ownerId: 4,
        address: '369 Willow St',
        city: 'Seattle',
        state: 'Washington',
        country: 'USA',
        lat: 47,
        lng: -122,
        name: 'Urban Retreat',
        description: 'Discover the essence of urban living at this stylish retreat in Seattle. Located in the heart of the city, it offers a chic and comfortable space to unwind. Immerse yourself in the vibrant culture, visit iconic landmarks, or simply relax on the balcony and enjoy the bustling cityscape.',
        price: 270.00
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, null, {});
  }
};
