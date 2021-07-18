import React, { useRef, useEffect } from "react";
import createOrder from "./orderCreator";

export default function Paypal({ products,callback }) {
  const paypal = useRef();

  useEffect(() => {

    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create(createOrder(products));
        },
        onApprove: async (data, actions) => {
          callback();
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
