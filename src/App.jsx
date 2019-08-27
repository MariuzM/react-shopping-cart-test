import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import './App.scss';

import Shopping from './components/Pages/Shopping';
import Cart from './components/Context/Cart/Cart';

export default function App() {
  return (
    <div>
      <Container className="marginTop">
        <Route exact path="/" component={Shopping} />
        <Route path="/cart" component={Cart} />
      </Container>
    </div>
  );
}
