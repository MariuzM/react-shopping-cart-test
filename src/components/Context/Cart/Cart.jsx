import React, { Component } from 'react';
import CartEmpty from './CartEmpty';
import { ProductConsumer } from '../context';
import CartList from './CartList';

import '../../../App.scss';

export default class Cart extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {value => {
            const { cart } = value;
            if (cart.length > 0) {
              return (
                <div>
                  <React.Fragment>
                    <CartList value={value} />
                  </React.Fragment>
                </div>
              );
            } else {
              return <CartEmpty />;
            }
          }}
        </ProductConsumer>
      </section>
    );
  }
}
