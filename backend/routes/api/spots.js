const { query } = require('express');
const express = require('express');
const { QueryInterface } = require('sequelize');
const { Spot } = require('../../db/models');
const { Review } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { User } = require('../../db/models');


const router = express.Router();

router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
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
            url += spot.url
        })
        element.previewImage = url

    })
    spotList.forEach(obj => {
        delete obj['Reviews'];
        delete obj['SpotImages'];

    })

    return res.json({ "Spots": spotList })
})


router.get('/current', async (req, res) => {
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
            })
            element.previewImage = url

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
    } else {
        res.status(403)
        return res.json({
        "message": "Forbidden"})
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

router.post('/', async (req, res) => {
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
    } else {
        res.status(403)
        return res.json({
        "message": "Forbidden"})
    }
})

router.post('/:spotId/images', async (req, res) => {
    const { user } = req
    const { url, preview } = req.body
    const spot = await Spot.findAll({
        where: {
            id: req.params.spotId
        }
    })
    if (!spot.length){
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
        spotList.forEach(element=>{
            delete element['createdAt'];
            delete element['updatedAt'];
            delete element['spotId']
        })
           return res.json(...spotList)
        }
})

router.put('/:spotId', async (req,res)=>{
    const {address, city, state, country, lat, lng, name, description,price} = req.body
    const {user} = req
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot){
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
    if (user){
        if (user.id === spot.ownerId){
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
        }

    } else {
        {
            res.status(403)
            return res.json({
            "message": "Forbidden"})
        }
    }
})

router.delete('/:spotId', async (req, res)=>{
    const {user} = req
    const spot = await Spot.findByPk(req.params.spotId);
    if(!spot){
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found"
          })
    }
    if (user){
        if (user.id === spot.ownerId){
            await spot.destroy()
            return res.json({
                "message": "Successfully deleted"
              })
        }
    } else {
        res.status(403)
        return res.json({
        "message": "Forbidden"})
    }

})

module.exports = router;
//comment
