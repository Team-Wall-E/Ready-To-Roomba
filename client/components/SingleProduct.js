import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProduct } from '../store/singleProduct';
import { fetchProducts, deleteProductThunk } from '../store/products';
import { addToCartThunk } from '../store/cart';
import UpdateProduct from './UpdateProduct';
import NotFoundPage from './NotFoundPage';
import ProductReviews from './ProductReviews';

class Product extends React.Component {
  constructor() {
    super()
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

  clickHandler (e) {
    e.preventDefault();
    this.props.fetchProducts();
  }

  render() {
    const { product, addToCart, deleteProduct} = this.props;
    console.log('🫖', product);

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
              <img src={product.imageUrl} alt='image of product' />
              <button onClick={() => addToCart(product)}>Add to Cart</button>
              <div id='accordionFlush'>
                <div>
                  <div>
                    <div>
                      <UpdateProduct id={product.id} />
                    </div>
                  </div>
                  <br />
                  <h2 id='flush-headingOne'>
                    <Link to={`/products/${product.id}/add`}>
                      <button type='button'>Add Review</button>
                    </Link>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button onClick={(e) => {this.props.deleteProduct(product.id); this.clickHandler(e)}}>Delete</button>
          </div>
          <div>
            <ProductReviews productId={product.id} />
          </div>
        </section>
      );
    } else {
      return <NotFoundPage />;
    }
  }
}

const mapState = ({ product }) => ({
  product,
});

const mapDispatch = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  getProduct: (id) => dispatch(fetchProduct(id)),
  deleteProduct: (id) => dispatch(deleteProductThunk(id, history)),
  addToCart: (product) => dispatch(addToCartThunk(product)),
});

export default connect(mapState, mapDispatch)(Product);
