require('dotenv').config();
console.log("staarting");
const cors = require('cors');
const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const path = require('path');
const userRouter=require('./router/user');
const productRouter=require('./router/product');
const categoryRouter=require('./router/category');
const paypalRouter=require("./router/paypal");
const facebookRouter=require("./passport/facebookRouter");
const imageRouter=require("./router/image");
const passportUtil=require("./passport/main")();
const app=express();  
app.use('*', function(req, res, next) {
  //replace localhost:8080 to the ip address:port of your server
  res.header("Access-Control-Allow-Origin", "https://localhost:3000");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next(); 
  });
  
  //enable pre-flight
  app.options('*', cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
const uri=process.env.ATLAS_URI;
console.log(uri);
console.log(`uri is ${uri}`);
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true}).catch((err)=>console.log(err));

const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("connection to mongo db has been created succssfully");
});
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(passportUtil.passport.initialize());
app.use(passportUtil.passport.session());
const port = process.env.PORT || 8000;

app.listen(port,()=>console.log(`server is listening at ${port}`));
app.use("/facebook",facebookRouter)
app.get('/connect/facebook', passportUtil.passport.authorize('facebook', { scope : ['email'] }));

app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/category',categoryRouter);
app.use("/paypal",paypalRouter);
app.use("/image",imageRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

/* const express = require('express');
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AfU8pasHovsZE_Nqh9EKtQxWAVIQM8O3GeZyfY2hs1jhwUznKdR4ebl725JjRYpyHbIku9-OVFF58ik4',
  'client_secret': 'ECgRi2esdvRvGQ54SULn7gbeQpZVeMWnCAG0IDIXVWDTP89FKatlFtGIRlwGo-3YiEt1fV1rMv8A7Oc7'
});

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));

app.post('/pay', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:3000/success",
      "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": "Red Sox Hat",
          "sku": "001",
          "price": "25.00",
          "currency": "USD",
          "quantity": 1
        }]
      },
      "amount": {
        "currency": "USD",
        "total": "25.00"
      },
      "description": "Hat for the best team ever"
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });

});

app.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": "25.00"
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      console.log(JSON.stringify(payment));
      res.send('Success');
    }
  });
});

app.get('/cancel', (req, res) => res.send('Cancelled'));

app.listen(3000, () => console.log('Server Started')); */