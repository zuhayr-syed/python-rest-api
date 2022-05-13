const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/Url');

// @route   POST /api/url/shorten
// @desc    Create short URL
router.post('/shorten', async (req, res) =>{
    const { longUrl } = req.body;
    const baseUrl = config.get('baseURL');

    if(!validUrl.isUri(baseUrl)) { // Checks if Url is not valid
        return res.status(401).json('Invalid base URL');
    }

    // Check long url
    if(validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl }); 
            
            if(url){ // Check if url is already in db and return if it is
                res.json(url);
            } else{
                // Create url code
                let urlCode = shortid.generate();

                // Ensure that url id is unique, if not create another one
                let URLCode = urlCode;
                let idCheck = await Url.findOne({ urlCode: URLCode });
                if(idCheck) { 
                    urlCode =  uniqueID();
                }

                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url ({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();

                res.json(url);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json('Server error')
        }
    } else{
        res.status(401).json('Invalid long URL');
    }

});

async function uniqueID () {
    const URLCode = shortid.generate();
    idCheck = await Url.findOne({ urlCode: URLCode });
    if(idCheck) {
        return uniqueID();
    } else{
        return URLCode;
    }
}

module.exports = router;