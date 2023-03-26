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
            if (image.preview){
                item.Spot.previewImage = image.url
            }
            if (!image.preview){
                if (!item.Spot.previewImage){
                    item.Spot.previewImage = null
                }
            }
          })
        delete item.Spot['createdAt'];
        delete item.Spot['updatedAt']
        delete item.Spot['SpotImages']
        delete item.Spot['description']
        })

        return res.json({ "Bookings": bookingList })
    }
})
router.put('/:bookingId', requireAuth, async (req, res)=>{
    const {user} = req;
    const {startDate, endDate} = req.body
    const booking = await Booking.findByPk(req.params.bookingId)
    let sDate = new Date(startDate)
    let eDate = new Date(endDate)
    let sTime = sDate.getTime()
    let eTime = eDate.getTime()
    let today = new Date()
    let time = today.getTime()
    let error = {}
    let error2 = {}
    let array = []
    if (sTime >= eTime){
        error2.endDate = "endDate cannot come before startDate"
    }
    if(Object.keys(error2).length > 0){
        res.status(400)
        return res.json({"message": "Bad Request",
        "errors": error2
    })
    }

    if (!booking){
        res.status(404)
        return res.json({"message": "Booking couldn't be found"})
    }
    if (user){
        if (booking.userId === user.id){
            if (time > booking.startDate.getTime() ){
                res.status(403)
                return res.json({
                    "message": "Past bookings can't be modified"
                  })
            }
            const allbookings = await Booking.findAll({
                where: {
                    id: req.params.bookingId
                }
            })
            allbookings.forEach(ele=>{
                array.push(ele.toJSON())
            })
            array.forEach(part=>{
                if (sTime <= part.endDate.getTime() && sTime >= part.startDate.getTime()) {
                    error.startDate = "Start date conflicts with an existing booking"
                }
                if (eTime >= part.startDate.getTime() && eTime <= part.endDate.getTime()) {
                    error.endDate = "End date conflicts with an existing booking"
                }
                if (Object.keys(error).length > 0) {
                    res.status(403)
                    return res.json({
                        "message": "Sorry, this spot is already booked for the specified dates",
                        "errors": error
                    })
                }
            })

            booking.startDate = startDate
            booking.endDate = endDate
            await booking.save()
            return res.json(booking)

        } else {
            res.status(403)
            return res.json({
                "message": "Forbidden"
              })
        }
    }
})
router.delete('/:bookingId', requireAuth, async (req, res)=>{
const {user} = req
const booking = await Booking.findByPk(req.params.bookingId);
if (!booking){
    res.status(404)
    return res.json({
        "message": "Booking couldn't be found"
      })
}
let sDate = new Date(booking.startDate)
let eDate = new Date(booking.endDate)
let sTime = sDate.getTime()
let eTime = eDate.getTime()
let today = new Date()
let time = today.getTime()

if (time > sTime && time < eTime){
    res.status(403)
    return res.json({
        "message": "Bookings that have been started can't be deleted"
      })
}
const spot = await Spot.findByPk(booking.spotId)
if (user){
    if (user.id === booking.userId || user.id === spot.ownerId){
        await booking.destroy()
        return res.json({
            "message": "Successfully deleted"
          })
    } else {
        res.status(403)
        return res.json({
            "message": "Forbidden"
          })
    }
}

})
module.exports = router
