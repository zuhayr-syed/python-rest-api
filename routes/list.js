const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

// @route GET /api/all
// @desc Redirect to the long/original URL
router.get('/all', async(req, res) =>{
    try {
       const url = await Url.find();
       res.json(url);
    } catch(err) {
        console.log(err);
        res.status(500).json('Server error');
    }
});

module.exports = router;