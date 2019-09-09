import React from 'react';
import { ProductProvider } from '../Context/context';
import Floater from './Floater';

export default function Shopping() {
  return (
    <>
      <ProductProvider>
        <Floater />
      </ProductProvider>
    </>
  );
}
