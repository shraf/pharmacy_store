const Image = require("../models/image");
const express = require("express");
const { Mongoose } = require("mongoose");
const router = express.Router();
router.get("/:id", (req, res) => {
    Image.findById(req.params.id)
        .then(image => res.send(image));
})

router.get("/all/:ids", (req, res) => {
    const imagesIds = req.params.ids;
    imagesIds.map(imageId => Mongoose.Types.ObjectId(imageId));
    Image.find({
        "_id": {
            $in: imagesIds
        }
    })
        .then(images => res.send(images));
})
module.exports=router;