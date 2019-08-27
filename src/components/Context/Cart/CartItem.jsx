import React from 'react';
import Button from '@material-ui/core/Button';

export default function CartItem({ item, value }) {
  const { id, title, img, price, total, count } = item;
  const { increment, decrement, removeItem } = value;
  return (
    <div>
      <div>
        <img src={img} style={{ width: '2rem', height: '5rem' }} />
      </div>

      <div>
        <span>{title}</span>
      </div>

      <div>
        <span>{price}</span>
      </div>

      <span>
        <Button
          onClick={() => {
            increment(id);
          }}
        >
          +
        </Button>
      </span>

      <span>
        <div>{count}</div>
      </span>

      <span>
        <Button
          onClick={() => {
            decrement(id);
          }}
        >
          -
        </Button>
      </span>

      <div>
        <Button onClick={() => removeItem(id)}>Remove Icon</Button>
      </div>

      <div>
        <strong>Item Total: $ {total} </strong>
      </div>
    </div>
  );
}
