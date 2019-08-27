import React, { Component } from 'react';
import { ProductConsumer } from './context';
import { ProductProvider } from './context';
import Product from './Product';

export default class ProductList extends Component {
  render() {
    return (
      <div className="cardBox">
        <ProductProvider>
          <React.Fragment>
            <ProductConsumer>
              {value => {
                return value.products.map(prod => {
                  // eslint-disable-next-line
                  const { id, title, price, inCart } = prod;
                  return (
                    <div key={prod.id}>
                      <Product product={prod} />
                      {/* <h3>{price}</h3> */}
                    </div>
                  );
                });
              }}
            </ProductConsumer>
          </React.Fragment>
        </ProductProvider>
      </div>
    );
  }
}
