import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProduct } from '../store/singleProduct';
import { deleteProductThunk } from '../store/products';
import { createOrderThunk } from '../store/orders';
// TODO: import UpdateProduct from './UpdateProduct';
// TODO: import ProductNotFound from './ProductNotFound';

class Product extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProduct(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product.id !== this.props.product.id) {
      this.props.getProduct(this.props.product.id);
    }
  }

  // Add to cart
  // if !order, create order, create line item
  // if order, create line item
  // if order && product already in line item, add to qty
  //get order
  handleClick = (product) => {
    const order = this.props.order;
    if (!order) {
      const newOrder = createOrder();
      createLineItem(product, newOrder);
    } else {
      // if order, create line item
      // if order && product already in line item, add to qty
    }
  };

  render() {
    const { product } = this.props;

    if (product) {
      return (
        <section key={product.id}>
          <div key={product.id}>
            <div>
              <h2>{product.productName}</h2>
              <address>{product.price}</address>

              <p>{product.description}</p>
            </div>
            <div>
              <img src={product.imageUrl} alt="image of product" />
              <button onClick={handleClick(product)}>Add to Cart</button>
              <div id="accordionFlush">
                <div>
                  <h2 id="flush-headingOne">
                    <button
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      Edit product
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlush"
                  >
                    <div>
                      {/* TODO: Can be placeholder for product update form */}
                      {/* TODO: <UpdateProduct /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      // TODO: Placeholder for 404 product not found page
      // TODO:  return <ProductNotFound />;
    }
  }
}

const mapState = ({ product }) => ({
  product,
});

const mapDispatch = (dispatch) => ({
  getProduct: (id) => dispatch(fetchProduct(id)),
  deleteProduct: (product) => dispatch(deleteProductThunk(product, history)),
  createOrder: () => dispatch(createOrderThunk()),
  createLineItem: (order, product) =>
    dispatch(createLineItemThunk(order, product)),
  updateLineItem: (lineItem) => dispatch(updateLineItemThunk(lineItem)),
});

export default connect(mapState, mapDispatch)(Product);
