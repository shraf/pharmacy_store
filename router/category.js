const Category = require('../models/category');
const express = require('express');
const app = express();
const router = express.Router();
var multer = require('multer');
const fs = require('fs');
var upload = multer({ dest: 'uploads/' })
const cache = require("node-cache");
const myCache = new cache();
/////////////GET REQUESTS //////////////
function _arrayBufferToBase64( buffer ) {
    return  Buffer.from(buffer).toString("base64");
}

router.get('/', (req, res) => {
    const isCacheExists = myCache.has("categories");
    if (isCacheExists){
        console.log("exists");
        res.send(myCache.get("categories")).end()
    }
    else
        Category.find()
            .then(categories => { myCache.set("categories",categories.map(category=>({name:category.name,_id:category._id,image:_arrayBufferToBase64(category.img.data)}))); res.send(categories); });
});
router.get("/names",(req,res)=>{
    Category.find({},"name").then(category=>res.json(category))
 

})
router.post("/", upload.single('file'), (req, res) => {
    var new_img = new Category;
    new_img.img.data = fs.readFileSync(req.file.path)
    new_img.name = req.body.name;
    new_img.img.contentType = 'image/jpeg';  // or 'image/png'
    new_img.save().then(category=>res.status(200).json(category._id));

    console.log(req.file)
})

router.delete("/:name",(req,res)=>{
    Category.findOneAndRemove({name:req.params.name})
    .then(()=>res.status(200).send("deleted successfully"))
    .catch(err=>{
        console.log(err);
        res.status(400).send("err occured").end();
    });
})
module.exports = router;