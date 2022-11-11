const express = require("express");
const router = express.Router();

const Url = require("../models/Url");

// @route GET /api/url/delete/:id
router.delete("/:id", async (req, res) => {
  try {
    Url.findByIdAndDelete(req.params.id, (err, docs) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      } else {
        return res.json(200, "Deleted: " + docs);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
