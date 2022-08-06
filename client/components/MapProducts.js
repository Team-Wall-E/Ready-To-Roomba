import React from 'react';
import { Link } from 'react-router-dom';

export default function MapProducts(props) {
  return props.products.map((product) => {
    return (
      <div key={product.id}>
        <div>
          <img src={product.imageUrl} alt="image of product" />
          <div>
            <h4>
              <Link to={`/products/${product.id}`}>{product.productName}</Link>
            </h4>
            <address>{product.price}</address>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    );
  });
}