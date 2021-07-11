const express=require("express");
const app=express();
const router=express.Router();
const paypal=require("../models/paypal/paypal.js");
const transaction=new paypal();

router.post("/",(req,res)=>{
transaction.createPayment((link)=>res.redirect(link));
})

router.get("/success",(req,res)=>{
    console.log("success");
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    transaction.executePayment(paymentId,payerId,()=>res.send("success"));
})

module.exports=router;