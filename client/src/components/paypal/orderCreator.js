const createUnits = (products) => {
    console.log("hiii");
    const total = products.reduce(function(accumelator, currentValue){
        return accumelator+currentValue.price*currentValue.quantity;
    },0);
    console.log(products);
console.log(total);
    const items = products.map(item => {
        return ({
            name: item.name,
            "unit_amount": {
                currency_code: "USD",
                value: item.price
            },
            quantity: item.quantity
        }
        );
    });

    return { items: items, total, total };
};

const createOrder = (products) => {
    console.log("zb");
    const units = createUnits(products);
    return (
        {
            intent: "CAPTURE",
            purchase_units: [
                {

                    amount: {
                        currency_code: "USD",
                        value: units.total,
                        breakdown: {
                            item_total: {
                                currency_code: "USD",
                                value: units.total
                            }
                        }
                    },
                    items: units.items,

                }
            ],
        }
    )
}
export default createOrder;