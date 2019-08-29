import React, { Component } from 'react';
import CartColumns from './CartColumns';
import CartEmpty from './CartEmpty';
import { ProductProvider } from '../context';
import { ProductConsumer } from '../context';
import CartList from './CartList';

export default class Cart extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {value => {
            console.log(value);
            const { cart } = value;
            if (cart.length > 0) {
              return (
                <div>
                  <React.Fragment>
                    <CartColumns />
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
