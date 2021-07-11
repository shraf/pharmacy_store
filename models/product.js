const mongoose = require('mongoose');
const schema = mongoose.Schema;
const image=new schema({
   
});
const review = new schema({
    pros: String,
    cons:String,
    opinion:String,
    rating: { type: Number, required: true },
    userId: String,
    userName:String
})
const productSchema = new schema({
    name: {
        type: String,
        required: true,
        unique:true,
        minlength: 3
    },
    discription: {
        type: String,
        required: true,
        trim:true,
        
        minlength: 50
    },
    price: {
        type: Number,
        required: true
    },
    reviews: {
        type: [review]
    },
    avgRating:{
        type:Number,
        default:0
    },
    category: {
        type: String,
        required: true
    },
    image: {
        name:String,
        img:Buffer
    
    },
    product_image: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"images"
    }
});
const Product = mongoose.model('product', productSchema);
module.exports = Product;