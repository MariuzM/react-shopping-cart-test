import React, { Component } from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { ProductContext } from './context'

export default class Product extends Component {
  render() {
    const { id, title, img, price, inCart } = this.props.product
    return (
      <ProductContext.Consumer>
        {value => (
          <Box className="card card-1">
            <h3>{title}</h3>
            <p>${price}</p>
            <Button
              disabled={inCart ? true : false}
              onClick={() => {
                value.addToCart(id)
              }}
            >
              {inCart ? <i>In Cart</i> : <i>Buy</i>}
            </Button>
          </Box>
        )}
      </ProductContext.Consumer>
    )
  }
}
