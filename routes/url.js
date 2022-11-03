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
    let { urlCode } = req.body;
    const baseUrl = config.get('baseURL');

    if(!validUrl.isUri(baseUrl)) { // Checks if Url is not valid
        return res.status(401).send({error: 'Invalid base URL'});
    }

    // Check long url
    if(validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl }); 
            
            if(url){ // Check if url is already in db and return if it is
                res.status(400).send({error: 'This url has already been shortened'});
            } else{
                
                if(urlCode === ""){
                    // Create url code
                    urlCode = shortid.generate();
                    // Ensure that url id is unique, if not create another one
                    let URLCode = urlCode;
                    let idCheck = await Url.findOne({ urlCode: URLCode });
                    if(idCheck) { 
                        urlCode =  uniqueID();
                    }
                } else {
                    let URLCode = urlCode;
                    let idCheck = await Url.findOne({ urlCode: URLCode });
                    if(idCheck) {
                        res.status(400).send({error: 'This url code has already been used'});
                    }
                }

                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url ({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();

                res.status(200).send({message: 'Url has been shrunk!'});
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({error: 'Server error'});
        }
    } else{
        res.status(400).send({error: 'Invalid long URL'});
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