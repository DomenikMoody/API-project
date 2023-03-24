const { query } = require('express');
const express = require('express');
const { QueryInterface } = require('sequelize');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');

router.delete('/:imageId', requireAuth, async (req, res)=>{
    const {user} = req
    const image = await SpotImage.findByPk(req.params.imageId);
    if (!image){
        res.status(404)
        return res.json({"message": "Spot Image couldn't be found"})
    }
    const spot = await Spot.findByPk(image.spotId)
    if (user){
        if (user.id === spot.ownerId){
            await image.destroy()
            return res.json({"message": "Successfully deleted"})
        } else {
            res.status(403)
            return res.json({"message": "Forbidden"})
        }
    }
})

module.exports = router
