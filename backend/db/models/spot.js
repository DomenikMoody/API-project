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
      allowNull: false,
      unique: true,
    },
    city: {
      type:DataTypes.STRING,
      allowNull: false
    },
    state: {
      type:DataTypes.STRING,
      allowNull:true
    },
    country: {
      type:DataTypes.STRING,
      allowNull:false
    },
    lat: {
      type:DataTypes.DECIMAL,
    },
    lng: {
      type:DataTypes.DECIMAL,
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: {
      type:DataTypes.STRING,
    },
    price: {
      type:DataTypes.DECIMAL
      }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
