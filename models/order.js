const mongoose = require('mongoose');
const Product = require('./product');
const schema = mongoose.Schema;
const address = new schema({
    state: String,
    city: String,
    region: String,
    detailedAddress: String
})
const product = new schema({
    item: {type:mongoose.Schema.Types.ObjectId,ref:"product"},
    quantity: Number
})
const orderSchema = new schema({
    products: [{item: {type:mongoose.Schema.Types.ObjectId,ref:"product"},
    quantity: Number}],
    userId: {
        type: String,
        required: true
    },

    arriveTime: {
        type: Date,
        required: false
    },
    address: {
        type: address
    },
    price:{
        type:Number,
        required:true
    }
}
,{timestamps:true}
)


const Order = mongoose.model('order', orderSchema);
module.exports = Order;