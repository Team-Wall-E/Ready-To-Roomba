import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store/singleProduct';
// import { deleteProductThunk } from '../store/products';
// import { createOrderThunk, setOrders } from '../store/orders';
// import { createLineItemThunk } from '../store/lineItems';
// import { updateLineItemThunk } from '../store/singleLineItem';
// import { setOrder } from '../store/singleOrder';
import UpdateProduct from './UpdateProduct';
import NotFoundPage from './NotFoundPage';
import { addToCart } from '../store/cart';

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

  // TODO: Sorry, unable to properly import order.getLineItems
  //   createNewOrder = (product) => {
  //     const newOrder = this.props.createOrder(
  //       ...{
  //         status: 'processing',
  //       }
  //     );
  //     this.props.createLineItem(product, newOrder);

  //     handleClick = (id) => {
  //       this.props.addToCart(id);
  //     };
  //   };

  render() {
    const { product } = this.props;
    const { createNewOrder } = this;

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
              <button
                onClick={() => {
                  this.props.addToCart(product.id);
                }}
              >
                Add to Cart
              </button>
              <div id="accordionFlush">
                <div>
                  <h2 id="flush-headingOne">
                    <button type="button">Edit product</button>
                  </h2>
                  <div>
                    <div>
                      <UpdateProduct id={product.id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      return <NotFoundPage />;
    }
  }
}

const mapState = ({ product, order, lineItems }) => ({
  product,
  order,
  lineItems,
});

const mapDispatch = (dispatch) => ({
  getProduct: (id) => dispatch(fetchProduct(id)),
  addToCart: (id) => {
    dispatch(addToCart(id));
  },
  //   deleteProduct: (product) => dispatch(deleteProductThunk(product, history)),
  //   createOrder: (order) => dispatch(createOrderThunk(order)),
  //   setOrder: (order) => dispatch(setOrderThunk(order)),
  //   createLineItem: (order, product) =>
  //     dispatch(createLineItemThunk(order, product)),
  //   updateLineItem: (lineItem) => dispatch(updateLineItemThunk(lineItem)),
});

export default connect(mapState, mapDispatch)(Product);
