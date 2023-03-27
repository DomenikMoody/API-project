const { query } = require('express');
const express = require('express');
const { QueryInterface } = require('sequelize');
const { Spot } = require('../../db/models');
const { Review } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { User } = require('../../db/models');
const router = express.Router();
const { ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    if (user) {
        const allReviews = await Review.findAll({
            where: {
                userId: user.id
            },
            include: [
                {
                    model: User
                },
                {
                    model: Spot,
                    include: [
                        {
                            model: SpotImage
                        }
                    ]
                },
                {
                    model: ReviewImage
                },

            ]
        })

        let reviewList = []
        allReviews.forEach(review => {
            reviewList.push(review.toJSON())
        })

        reviewList.forEach(review => {

            if (review.Spot.SpotImages[0].preview === true) {
                review.Spot.previewImage = review.Spot.SpotImages[0].url
            } else {
                if (!review.Spot.previewImage){
                    review.Spot.previewImage = null
                }
            }
            delete review.Spot['SpotImages']
            delete review.User["username"]
            delete review.Spot["description"];
            delete review.Spot["createdAt"];
            delete review.Spot["updatedAt"];
            review.ReviewImages.forEach(images => {
                delete images["reviewId"];
                delete images["createdAt"];
                delete images["updatedAt"]
            })

        })
        return res.json({ "Reviews": reviewList })
    }
})

router.post('/:reviewId/images',requireAuth, async (req,res)=>{
    const {user} = req
    const {url} = req.body
    const review = await Review.findByPk(req.params.reviewId);
    if (!url){
        res.status(400)
        return res.json({
            "message": "Bad Request",
            "error": "Must Add An Image"
        })
     }
    if (Object.keys(review).length < 1){
        res.status(404)
        return res.json({
            "message": "Review couldn't be found"
          })
    }
    const reviews = await ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        }
    })
    if (reviews.length >= 10){
        res.status(402)
        return res.json({
            "message": "Maximum number of images for this resource was reached"
          })
    }
    if (user){
        if (user.id === review.userId){
            await ReviewImage.create({
                reviewId: req.params.reviewId,
                url: url
            })
            const result = await ReviewImage.findAll({
                where: {
                    url: url
                }
            })
            let array = []
            result.forEach(image=>{
                array.push(image.toJSON())
            })
            array.forEach(part=>{
                delete part['reviewId']
                delete part['createdAt']
                delete part['updatedAt']
            })
            return res.json(...array)
        } else {
            res.status(403)
            return res.json({
                "message": "Forbidden"
              })
        }

    }
})

router.put('/:reviewId',requireAuth, async (req, res) => {
    const { user } = req
    const { review, stars } = req.body
    const reviews = await Review.findByPk(req.params.reviewId)
    if (!reviews) {
        res.status(404);
       return res.json({ "message": "Review couldn't be found" })
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
            return res.json({
                "message": "Bad Request",
                "errors": error
            })
        }
        if (reviews.userId === user.id) {
            reviews.review = review
            reviews.stars = stars
            await reviews.save()
            return res.json(reviews)
        } else {
            res.status(403)
            return res.json({
                "message": "Forbidden"
              })
        }
    }
})

router.delete('/:reviewId',requireAuth, async (req,res)=>{
    const {user} = req
    const review = await Review.findByPk(req.params.reviewId)
    if (!review){
        res.status(404);
        return res.json({
            "message": "Review couldn't be found"
          })
    }
    if (user) {
        if (user.id === review.userId) {
            await review.destroy()
            return res.json({
                "message": "Successfully deleted"
            })
        }
    } else {
        res.status(403)
        return res.json({
            "message": "Forbidden"
        })
    }

})


module.exports = router;
