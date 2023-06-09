'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.hasMany(models.ReviewImage, {foreignKey:'reviewId', onDelete: "cascade", hooks: "true"})
      Review.belongsTo(models.User, {foreignKey:"userId"})
      Review.belongsTo(models.Spot, {foreignKey:"spotId"})
    }
  }
  Review.init({
    id: {
      allowNull:false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    spotId: {
     type: DataTypes.INTEGER,
     references: {
      model: 'Spots'
     },
     onDelete: "CASCADE",
     hooks:true
    },
    userId: {
      type:DataTypes.INTEGER,
      references: {
        model: 'Users'
      },
      onDelete:"CASCADE",
      hooks:true
    },
    review: {
     type: DataTypes.TEXT,
    },
    stars: {
      type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
