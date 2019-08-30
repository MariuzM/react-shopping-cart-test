import React, { Component } from 'react';
import CartEmpty from './CartEmpty';
import { ProductConsumer } from '../context';
import CartList from './CartList';
import CartTotals from './CartTotals';

import '../../../App.scss';

export default class Cart extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const { cart } = value;
          if (cart.length > 0) {
            return (
              <>
                <CartList value={value} />
                <CartTotals value={value} />
              </>
            );
          } else {
            return <CartEmpty />;
          }
        }}
      </ProductConsumer>
    );
  }
}
