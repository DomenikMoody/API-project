'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(models.User, {foreignKey:ownerId});
      Spot.HasMany(models.User, {through:'Bookings',foreignKey:'spotId'});
      Spot.HasMany(models.SpotImage, {foreignKey: 'spotId'});
      Spot.HasMany(models.User, {through: 'Reviews',foreignKey: 'userId'})
    }
  }
  Spot.init({
    ownerId: {
      type:DataTypes.INTEGER,
      references: {
        model: 'Users'
      }
    },
    address: {
      type:DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    city: {
      type:DataTypes.STRING,
      allowNull: false
    },
    state: {
      type:DataTypes.STRING,
    },
    country: {
      type:DataTypes.STRING,
      allowNull:false
    },
    lat: {
      type:DataTypes.DECIMAL,
      validate: {
      isValidLat(value){
        if (value < -90 || value > 90){
          throw new Error('Enter a valid Latitude')
        }
      }
      }
    },
    lng: {
      type:DataTypes.DECIMAL,
      validate: {
        isValidLng(value){
          if (value < -180 || value > 180){
            throw new Error('Enter a valid Longitude')
          }
        }
      }
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: {
      type:DataTypes.STRING,
      validate: {
        len: [1,250]
    },
    price: {
      type:DataTypes.DECIMAL
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
