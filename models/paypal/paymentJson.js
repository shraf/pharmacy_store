const createPaymentJson = () => {
    const paymentJson = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:8000/paypal/success",
            "cancel_url": "http://localhost:8000/paypal/cancel"
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
    return paymentJson;
}
const createExecutePaymentJson = (payerId) => {

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "25.00"
            }
        }]
    };
    return execute_payment_json;
};
module.exports = {
    createPaymentJson: createPaymentJson,
    createExecutePaymentJson: createExecutePaymentJson
};