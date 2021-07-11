const mongoose=require('mongoose');
const schema=mongoose.Schema;
const categorySchema=new schema({
    name:{
        type:String,
        required:true
    },
    img:{
       data:Buffer,
        contentType:String
    }
});
const Category=mongoose.model('category',categorySchema);
module.exports = Category;