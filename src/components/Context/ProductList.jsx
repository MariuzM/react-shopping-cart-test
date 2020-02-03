import React, { Component } from 'react'
import { ProductContext } from './context'
import Product from './Product'

export default class ProductList extends Component {
  render() {
    return (
      <div className="cardBox">
        <ProductContext.Consumer>
          {value => {
            return value.products.map(prod => {
              return (
                <div key={prod.id}>
                  <Product product={prod} />
                </div>
              )
            })
          }}
        </ProductContext.Consumer>
      </div>
    )
  }
}
