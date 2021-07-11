const mongoose = require('mongoose');
const Validator = require('../util/validator');
const schema = mongoose.Schema;
const address = new schema({
    state:String,
    city:String,
    region:String,
    detailedAddress:String
})
const userSchema = new schema({
    facebook_id:{type:String,unique:true,required:false},
    password: {
        type: String,
        required: false,
        minlength: 6,
        unique: false
    },
    firstname: {
        type: String,
        minlength: 3,
        validate: [Validator.validateName, 'please fill a valid name']
    },
    lastname: {
        type: String,
        minlength: 3,
        validate: [Validator.validateName, 'please fill a valid name']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [Validator.validateEmail, 'please fill a valid email address']
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: [Validator.validatePhone, 'please fill a valid phone number']
    },
    address:{
        type:address
    },
    accountType:{
        type:String,
        default:'user'
    },
    
    orders:{
        type:[String]
    }

})
userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        console.log("kson elerror");
        console.log(error);
        const field=Object.getOwnPropertyNames(error.keyPattern)[0];
      next(new Error(`${field} must be unique`));
    } else {
      next();
    }
  });
const User=mongoose.model('user',userSchema);
module.exports=User;