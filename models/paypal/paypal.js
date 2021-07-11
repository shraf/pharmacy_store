const paymentJson=require( "./paymentJson");
const createPaymentJson=paymentJson.createPaymentJson;
const createExecutePaymentJson=paymentJson.createExecutePaymentJson;
const paypal = require('paypal-rest-sdk');
class Paypal {
    constructor() {
        this.configure = paypal.configure({
            'mode': 'sandbox', //sandbox or live
            'client_id': 'ATeGMDGqqeBVLoOQz885BTCzYKCPT4ifYhAkM6O0DLn6P40Nr7cuPw8YJhBI5T7uW-VpIkB51Z0XA-bF',
            'client_secret': 'EJ_KJFcOoCx303_NLltSFsJ7RGKbxFvXseyychCeDKPUrBrtqSJaa8_vv_y7eA3E2eZVVM_SQNucsdGT'
        });
        
        this.create_payment_json=this.initialPaymentJson();
    }
     initialPaymentJson() {
         const create_payment_json=createPaymentJson();
        return create_payment_json;
    }
 
    createPayment(cb){
        paypal.payment.create(this.create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for(let i = 0;i < payment.links.length;i++){
                  if(payment.links[i].rel === 'approval_url'){
                    cb(payment.links[i].href);
                  }
                }
            }
          });
          
    }

    executePayment(paymentId,payerId,cb){
        const execute_payment_json=createExecutePaymentJson(payerId);
        console.log(this.configure);
        console.log(execute_payment_json);
        console.log(paymentId);
        console.log(payerId);
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
                cb();
            }
        });
    }


    
}
module.exports=Paypal;