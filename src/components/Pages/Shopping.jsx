import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ProductList from '../Context/ProductList';

export default class Shopping extends Component {
  render() {
    return (
      <div>
        <Button color="inherit" component={RouterLink} to="/cart">
          Shopping Cart
        </Button>
        <ProductList />
      </div>
    );
  }
}
