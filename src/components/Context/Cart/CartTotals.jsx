import React from 'react';
import Button from '@material-ui/core/Button';

export default function CartTotals({ value }) {
  const { cartSubTotal, cartTax, cartTotal, clearCart } = value;
  return (
    <>
      {/* <Button onClick={() => clearCart()}>Clear Cart</Button> */}

      <h5>
        Sub Total: $<strong>{cartSubTotal}</strong>
      </h5>

      <h5>
        Tax 20%: $<strong>{cartTax}</strong>
      </h5>

      <h3>
        Cart Total: $<strong>{cartTotal}</strong>
      </h3>
    </>
  );
}
