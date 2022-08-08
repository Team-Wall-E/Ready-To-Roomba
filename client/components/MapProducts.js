import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

export default function MapProducts(props) {
  return props.products.map((product) => {
    return (
      <Col key={product.id}>
        <Card>
          <Card.Img
            variant='top'
            className='card-img-top'
            src={product.imageUrl}
            alt='image of product'
          />
          <Card.Body>
            <Card.Title>
              <Link to={`/products/${product.id}`}>{product.productName}</Link>
            </Card.Title>
            <Card.Text>{product.price}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  });
}
