const mongoose = require("mongoose");
const schema = mongoose.Schema;

const imageSchema = new schema({
    name: String,
    img: Buffer

})

const Image=mongoose.model("images",imageSchema);
module.exports=Image;