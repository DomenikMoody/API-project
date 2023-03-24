const { query } = require('express');
const express = require('express');
const { QueryInterface } = require('sequelize');
const { Spot,Review,SpotImage,User,ReviewImage} = require('../../db/models');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');

router.get('/current', requireAuth, async (req, res)=>{
    
})
module.exports = router
