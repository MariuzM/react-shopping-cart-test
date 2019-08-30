import React, { Component } from 'react';
import { storeProducts } from '../../data';
const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    cart: [],
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };

  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    const price = product.price;
    product.inCart = true;
    product.count = 1;
    product.total = price;
    this.setState(
      () => {
        return {
          product: tempProducts,
          cart: [...this.state.cart, product]
        };
      },
      () => {
        console.log(this.state.cart);
      }
    );
  };

  increment = id => {
    console.log(id, 'Incr');
  };

  decrement = id => {
    console.log(id, 'Decr');
  };

  removeItem = id => {
    console.log(id, 'Item Removed');
  };

  clearCart = () => {
    console.log();
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          // products: this.state.products,
          ...this.state,
          addToCart: this.addToCart,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };
