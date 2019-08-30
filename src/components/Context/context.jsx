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
        this.addTotals();
      }
    );
  };

  addTotals = () => {
    let initialSubValue = 0.0;
    this.state.cart.map(item => (initialSubValue += item.total));
    const subTotal = parseFloat(initialSubValue.toFixed(2));
    const tax = parseFloat((subTotal * 0.2).toFixed(2));
    const total = parseFloat((subTotal + tax).toFixed(2));
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total
      };
    });
  };

  increment = id => {
    let tempCart = [...this.state.cart];
    const selectedItem = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedItem);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = parseFloat((product.count * product.price).toFixed(2));
    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  decrement = id => {
    let tempCart = [...this.state.cart];
    const selectedItem = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedItem);
    const product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) this.removeItem(id);
    else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };

  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id != id);
    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = false;
    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };

  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
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
