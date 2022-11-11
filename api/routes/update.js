const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const config = require("config");

const Url = require("../models/Url");

// @route PUT /api/url/update/:id
router.put("/:id", async (req, res) => {
  try {
    const { longUrl } = req.body;
    let { urlCode } = req.body;
    const baseUrl = config.get("baseURL");

    if (!validUrl.isUri(baseUrl)) {
      // Checks if Url is not valid
      return res.status(401).send({ error: "Invalid base URL" });
    }

    // Check long url
    if (validUrl.isUri(longUrl)) {
      try {
        let url = await Url.findOne({
          longUrl,
          _id: { $ne: req.params.id },
        });

        if (url !== null) {
          // Check if url is already in db and return if it is
          res
            .status(400)
            .send({ error: "This url has already been shortened" });
        } else {
          if (urlCode === "") {
            // Create url code
            urlCode = shortid.generate();
            // Ensure that url id is unique, if not create another one
            let URLCode = urlCode;
            let idCheck = await Url.findOne({ urlCode: URLCode });
            if (idCheck) {
              urlCode = uniqueID();
            }
          } else {
            let URLCode = urlCode;
            let idCheck = await Url.findOne({
              urlCode: URLCode,
              _id: { $ne: req.params.id },
            });
            if (idCheck !== null) {
              res.status(400).send({ error: "This url code has been used" });
            }
          }

          const shortUrl = baseUrl + "/" + urlCode;

          const updateUrl = {
            longUrl,
            shortUrl,
            urlCode,
            date: new Date(),
          };

          Url.findByIdAndUpdate(req.params.id, updateUrl, (err, docs) => {
            if (err) {
              console.log(err);
              return res.status(400).json(err);
            } else {
              res.status(200).send({ message: "Url has updated!" });
            }
          });
        }
      } catch (err) {
        console.log(err);
        res.status(500).send({ error: "Server error" });
      }
    } else {
      res.status(400).send({ error: "Invalid long URL" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
