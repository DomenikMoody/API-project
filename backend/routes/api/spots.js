const express = require('express');
const { Spot } = require('../../db/models');
const { Review } = require('../../db/models');
const { SpotImage } = require('../../db/models');


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
        }else {
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
    return res.json({ "Spots": spotList })
})

module.exports = router;