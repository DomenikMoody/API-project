const { query } = require('express');
const express = require('express');
const { QueryInterface } = require('sequelize');
const { Spot, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');


const router = express.Router();

router.get('/', async (req, res) => {
    let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    let error = {}
    if (page) {
        page = parseInt(page)
        if (page < 1) {
            error.page = "Page must be greater than or equal to 1"
        }
    } else {
        page = 1
    }
    if (size) {
        size = parseInt(size);
        if (size < 1) {
            error.size = "Size must be greater than or equal to 1"
        }
    } else {
        size = 20
    }
    if (maxLat) {
        maxLat = parseInt(maxLat)
        if (maxLat > 90) {
            error.maxLat = "Maximum latitude is invalid"
        }
    }
    if (minLat) {
        minLat = parseInt(minLat)
        if (minLat < -90) {
            error.minLat = "Minimum latitude is invalid"
        }
    }
    if (minLng) {
        minLng = parseInt(minLng)
        if (minLng < -180) {
            error.minLng = "Maximum longitude is invalid"
        }
    }
    if (maxLng) {
        maxLng = parseInt(maxLng)
        if (maxLng > 180) {
            error.maxLng = "Minimum longitude is invalid"
        }
    }
    if (minPrice) {
        minPrice = parseInt(minPrice)
        if (minPrice < 0) {
            error.minPrice = "Minimum price must be greater than or equal to 0"
        }
    }
    if (maxPrice) {
        maxPrice = parseInt(maxPrice)
        if (maxPrice < 0) {
            error.maxPrice = "Maximum price must be greater than or equal to 0"
        }
    }

    if (Object.keys(error).length > 0) {
        res.status(400)
        return res.json({
            "message": "Bad Request",
            "errors": error
        })
    }


    ;
    size = parseInt(size);
    const pagination = {}
    if (size >= 1 && size <= 20) {
        pagination.limit = size
    } else {
        pagination.limit = 20
    }
    if (page >= 1 && page <= 10) {
        pagination.offset = size * (page - 1)
    } else {
        pagination.offset = 1
    }
    const allSpots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ],
        ...pagination
    })
    let spotList = []
    allSpots.forEach(spot => {
        spotList.push(spot.toJSON())
    })
    spotList.forEach(element => {
        let num = element.Reviews.length
        let sum = 0;
        element.Reviews.forEach(star => {
            sum += star.stars
        })
        if (num === 0) {
            element.avgRating = 0
        } else {
            element.avgRating = parseFloat((sum / num).toFixed(1))
        }
        let url = ""
        element.SpotImages.forEach(spot => {
            if (spot.preview) {
                url += spot.url
            }
            element.previewImage = url
        })


    })
    spotList.forEach(obj => {
        delete obj['Reviews'];
        delete obj['SpotImages'];

    })

    return res.json({ "Spots": spotList, page, size })
})


router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    if (user) {
        const ownedSpot = await Spot.findAll({
            where: {
                ownerId: user.id
            },
            include: [
                {
                    model: Review
                },
                {
                    model: SpotImage
                }
            ]
        })
        let spotList = []
        ownedSpot.forEach(spot => {
            spotList.push(spot.toJSON())
        })
        spotList.forEach(element => {
            let num = element.Reviews.length
            let sum = 0;
            element.Reviews.forEach(star => {
                sum += star.stars
            })
            if (num === 0) {
                element.avgRating = 0
            } else {
                element.avgRating = (sum / num).toFixed(1)
            }
            let url = ""
            element.SpotImages.forEach(spot => {
                url += spot.url
                if (spot.preview === true) {
                    element.previewImage = url
                } else {
                    element.previewImage = null
                }
            })


        })
        spotList.forEach(obj => {
            delete obj['Reviews'];
            delete obj['SpotImages'];

        })
        if (!spotList.length) {
            res.status(404)
            return res.json({ "message": "Spot couldn't be found" })
        }
        return res.json({ "Spots": spotList })
    }
})

router.get('/:spotId', async (req, res) => {
    const specifiedSpot = await Spot.findAll({
        where: {
            id: req.params.spotId
        },
        include: [
            {
                model: SpotImage
            },
            {
                model: User
            },
            {
                model: Review
            }
        ]
    })
    let spotList = []
    specifiedSpot.forEach(spot => {
        spotList.push(spot.toJSON())
    })
    spotList.forEach(element => {
        let num = element.Reviews.length
        let sum = 0;
        element.Reviews.forEach(star => {
            sum += star.stars
        })
        if (num === 0) {
            element.avgRating = 0
        } else {
            element.avgRating = (sum / num).toFixed(1)
        }

        element.Owner = {
            "id": element.User.id,
            "firstName": element.User.firstName,
            "lastName": element.User.lastName
        }

        spotList.forEach(obj => {
            delete obj['Reviews'];
            delete obj['User'];
            obj.SpotImages.forEach(parts => {
                delete parts['createdAt'],
                    delete parts['spotId'],
                    delete parts['updatedAt']
            })
        })

    })
    if (!spotList.length) {
        res.status(404)
        return res.json({ "message": "Spot couldn't be found" })
    }

    return res.json(spotList)
})

router.post('/', requireAuth, async (req, res) => {
    const { user } = req
    const { address, city, state, country, lat, lng, name, description, price, } = req.body
    let error = {}
    if (user) {

        if (!address) {
            error.address = "Street address is required"
        }
        if (!city) {
            error.city = "City is required"
        }
        if (!state) {
            error.state = "State is required"
        }
        if (!country) {
            error.country = "Country is required"
        }
        if (lat < -90 || lat > 90) {
            error.lat = "Latitude is not valid"
        }
        if (lng < -180 || lng > 180) {
            error.lng = "Longitude is not valid"
        }
        if (!name || name.length > 50) {
            error.name = "Name must be less than 50 characters"
        }
        if (!description) {
            error.description = "Description is required"
        }
        if (price !== NaN && price < 1) {
            error.price = "Price per day is required"
        }
        if (Object.keys(error).length > 0) {
            res.status(400)
            return res.json({
                "message": "Bad Request",
                "errors": error
            })
        }
        await Spot.create({
            ownerId: user.id,
            address: address,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            name: name,
            description: description,
            price: price
        })
        res.status(201)
        return res.json(await Spot.findAll({
            where: {
                name: name
            }
        }))
    }
})

router.post('/:spotId/images',requireAuth, async (req, res) => {
    const { user } = req
    const { url, preview } = req.body
    const spot = await Spot.findAll({
        where: {
            id: req.params.spotId
        }
    })
    if (!spot.length) {
        res.status(404)
        return res.json({ "message": "Spot couldn't be found" })
    }
    let spotToJson = spot[0].toJSON()
    if (user) {
        if (user.id === spotToJson.ownerId) {

            await SpotImage.create({
                spotId: req.params.spotId,
                url: url,
                preview: preview
            })
        } else {
            res.status(403)
            res.json({ "message": "Forbidden" })
        }
        const spotPics = await SpotImage.findAll({
            where: {
                url: url
            }
        })
        let spotList = []
        spotPics.forEach(spot => {
            spotList.push(spot.toJSON())
        })
        spotList.forEach(element => {
            delete element['createdAt'];
            delete element['updatedAt'];
            delete element['spotId']
        })
        return res.json(...spotList)
    }
})

router.put('/:spotId', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const { user } = req
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found"
        })
    }
    let error = {}
    if (!address) {
        error.address = "Street address is required"
    }
    if (!city) {
        error.city = "City is required"
    }
    if (!state) {
        error.state = "State is required"
    }
    if (!country) {
        error.country = "Country is required"
    }
    if (lat < -90 || lat > 90) {
        error.lat = "Latitude is not valid"
    }
    if (lng < -180 || lng > 180) {
        error.lng = "Longitude is not valid"
    }
    if (!name || name.length > 50) {
        error.name = "Name must be less than 50 characters"
    }
    if (!description) {
        error.description = "Description is required"
    }
    if (price !== NaN && price < 1) {
        error.price = "Price per day is required"
    }
    if (Object.keys(error).length > 0) {
        res.status(400)
        return res.json({
            "message": "Bad Request",
            "errors": error
        })
    }
    if (user) {
        if (user.id === spot.ownerId) {
            spot.address = address
            spot.city = city
            spot.state = state
            spot.country = country
            spot.lat = lat
            spot.lng = lng
            spot.name = name
            spot.description = description
            spot.price = price

            await spot.save()

            return res.json(spot)
        } else {
            res.status(403)
            return res.json({
                "message": "Forbidden"
            })
        }
    }
})

router.delete('/:spotId', requireAuth, async (req, res) => {
    const { user } = req
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found"
        })
    }
    if (user) {
        if (user.id === spot.ownerId) {
            await spot.destroy()
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

router.get('/:spotId/reviews', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found"
        })
    } else {
        const allReviews = await Review.findAll({
            where: {
                spotId: spot.id
            },
            include: [
                {
                    model: User
                },
                {
                    model: ReviewImage
                }
            ]
        })
        let reviewList = []
        allReviews.forEach(review => {
            reviewList.push(review.toJSON())
        })
        reviewList.forEach(element => {
            delete element.User['username']
            element.ReviewImages.forEach(part => {
                delete part['reviewId']
                delete part['createdAt']
                delete part['updatedAt']
            })
        })
        res.json({ "Reviews": reviewList })
    }
})
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { user } = req
    const { review, stars } = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found"
        })
    }

    let error = {}
    if (user) {
        if (!review || review.length < 1) {
            error.review = "Review text is required"
        }
        if (!stars || stars < 1 || stars > 5) {
            error.stars = "Stars must be an integer from 1 to 5"
        }
        if (Object.keys(error).length > 0) {
            res.status(400)
            res.json({
                "message": "Bad Request",
                "error": error
            })
        }
        let array = []
        const allReviews = await Review.findAll({
            where: {
                spotId: req.params.spotId
            }
        })
        allReviews.forEach(review => {
            array.push(review.userId)
        })
        if (array.includes(user.id)) {
            res.status(404)
            return res.json({
                "message": "User already has a review for this spot"
            })
        }
        const newReview = await Review.create({
            userId: user.id,
            spotId: req.params.spotId,
            review: review,
            stars: stars
        })

        return res.json(newReview)

    }
})
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const { user } = req
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        res.status(404)
        return res.json({ "message": "Spot couldn't be found" })
    }
    if (user) {
        if (user.id !== spot.ownerId) {
            const bookings = await Booking.findAll({
                where: {
                    spotId: req.params.spotId
                }
            })
            let bookingList = []
            bookings.forEach(book => {
                bookingList.push(book.toJSON())
            })
            bookingList.forEach(book => {
                delete book['id']
                delete book['userId']
                delete book['createdAt']
                delete book['updatedAt']
            })
            return res.json({ "Bookings": bookingList })
        } else {
            const bookings2 = await Booking.findAll({
                include: [
                    {
                        model: User
                    }
                ],
                where: {
                    spotId: req.params.spotId
                }
            })
            let bookList2 = []
            bookings2.forEach(book => {
                bookList2.push(book.toJSON())
            })
            bookList2.forEach(book => {
                delete book.User['username']
            })

            return res.json({ "Bookings": bookList2 })
        }
    }
})
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { user } = req
    const { startDate, endDate } = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        res.status(404)
        return res.json({ "message": "Spot couldn't be found" })
    }
    let error = {}
    let error2 = {}
    let array = []
    let sDate = new Date(startDate)
    let eDate = new Date(endDate)
    let sTime = sDate.getTime()
    let eTime = eDate.getTime()
    if (user) {
        if (user.id === spot.ownerId) {
            res.status(401)
            return res.json({
                "message": "Forbidden"
            })
        } else {
            if (eTime <= sTime) {
                error.endDate = "endDate cannot be on or before startDate"
            }
            if (Object.keys(error).length > 0) {
                res.status(400)
                return res.json({
                    "message": "Bad Request",
                    "errors": error
                })
            }
            const bookings = await Booking.findAll({
                where: {
                    spotId: spot.id
                }
            })
            bookings.forEach(book => {
                array.push(book.toJSON())
            })
            array.forEach(part => {
                if (sTime <= part.endDate.getTime() && sTime >= part.startDate.getTime() || sTime < part.startDate.getTime() && eTime > part.endDate.getTime()) {
                    error2.startDate = "Start date conflicts with an existing booking"
                }
                if (eTime >= part.startDate.getTime() && eTime <= part.endDate.getTime()) {
                    error2.endDate = "End date conflicts with an existing booking"
                }
            })
            if (Object.keys(error2).length > 0) {
                res.status(403)
                return res.json({
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "errors": error2
                })
            }
            const createdBooking = await Booking.create({
                userId: user.id,
                spotId: spot.id,
                startDate: startDate,
                endDate: endDate

            })
            return res.json(createdBooking)
        }
    }
})

module.exports = router;
//comment
