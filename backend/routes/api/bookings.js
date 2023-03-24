const { query } = require('express');
const express = require('express');
const { QueryInterface } = require('sequelize');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    if (user) {
        const bookings = await Booking.findAll({
            where: {
                userId: user.id
            },
            include: [
                {
                    model: Spot,
                    include: [
                        {
                            model: SpotImage
                        }
                    ]
                }
            ]
        })
        let bookingList = []
        bookings.forEach(book=>{
            bookingList.push(book.toJSON())
        })
        bookingList.forEach(item=>{
          item.Spot.SpotImages.forEach(image=>{
            item.Spot.previewImage = image.url
          })
        delete item.Spot['createdAt'];
        delete item.Spot['updatedAt']
        delete item.Spot['SpotImages']
        delete item.Spot['description']
        })

        return res.json({ "Bookings": bookingList })
    }
})

module.exports = router
