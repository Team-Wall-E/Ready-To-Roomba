import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProduct } from '../store/singleProduct';
import { fetchProducts, deleteProductThunk } from '../store/products';
import { addToCartThunk } from '../store/cart';
import UpdateProduct from './UpdateProduct';
import NotFoundPage from './NotFoundPage';
import ProductReviews from './ProductReviews';
import Button from 'react-bootstrap/Button';

class Product extends React.Component {
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProduct(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product.id !== this.props.product.id) {
      this.props.getProduct(this.props.product.id);
    }
  }

  clickHandler(e) {
    e.preventDefault();
    const { fetchProducts } = this.props;
    fetchProducts();
  }

  render() {
    const { product, addToCart, deleteProduct, isAdmin } = this.props;

    if (product) {
      return (
        <div>
          <section className='py-5'>
            <div className='container px-4 px-lg-5 my-5' key={product.id}>
              <div className='row gx-4 gx-lg-5 align-items-center'>
                <div className='col-md-6'>
                  <img
                    className='card-img-top mb-5 mb-md-0'
                    src={product.imageUrl}
                    alt='image of product'
                  />
                </div>
                <div className='col-md-6'>
                  <div className='small mb-1'>SKU: {product.id}</div>
                  <h2 className='display-5 fw-bolder'>{product.productName}</h2>
                  <div className='fs-5 mb-5'>
                    <span className='text-decoration-line-through'>
                      $1000.00
                    </span>
                    <span>&nbsp;</span>
                    <span>${product.price}</span>
                  </div>
                  <p className='lead'>{product.description}</p>
                  <div className='d-flex'>
                    <Button type='button' onClick={() => addToCart(product)}>
                      <i className='bi-cart-fill me-1'></i>
                      Add to cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className='container px-4 px-lg-5 my-5'>
              <ProductReviews productId={product.id} />
              <Link to={`/products/${product.id}/add`}>
                <Button type='button'>Add Review</Button>
              </Link>
            </div>
            <div id='accordionFlush'>
              <div>
                <div>
                  {/*  start of admin */}
                  {isAdmin ? (
                    <div>
                      <UpdateProduct id={product.id} />
                      <br></br>
                      {/* TODO: add redirect to allproducts */}
                      <Button
                        type='button'
                        onClick={(e) => {
                          deleteProduct(product.id);
                          this.clickHandler(e);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  ) : null}
                </div>
                <br />
                {/* end admin */}
                <br />
              </div>
            </div>
          </section>
        </div>
      );
    } else {
      return <NotFoundPage />;
    }
  }
}

const mapState = (state) => ({
  product: state.product,
  isAdmin: state.auth.isAdmin,
});

const mapDispatch = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  getProduct: (id) => dispatch(fetchProduct(id)),
  deleteProduct: (id) => dispatch(deleteProductThunk(id, history)),
  addToCart: (product) => dispatch(addToCartThunk(product)),
});

export default connect(mapState, mapDispatch)(Product);
