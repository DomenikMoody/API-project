const { query } = require('express');
const express = require('express');
const { QueryInterface } = require('sequelize');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');


router.delete('/:imageId', requireAuth, async (req, res)=>{
    const {user} = req
    const reviewImage = await ReviewImage.findByPk(req.params.imageId)
    if (!reviewImage){
        res.status(404)
        return res.json({"message": "Review Image couldn't be found"})
    }
    const review = await Review.findByPk(reviewImage.reviewId)
    if (user){
        if (user.id === review.userId){
            await reviewImage.destroy()
            return res.json({"message": "Successfully deleted"})
        } else {
            res.status(403)
            return res.json({"message": "Forbidden"})
        }
    }
})

module.exports = router
