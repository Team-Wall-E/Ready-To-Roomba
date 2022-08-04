import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProduct } from '../store/singleProduct';
import { deleteProductThunk } from '../store/products';
// import UpdateProduct from './UpdateProduct';
// import ProductNotFound from './ProductNotFound';

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

  render() {
    const { product } = this.props;

    if (product) {
      return (
        <section key={product.id} className="single-page">
          <div className="row featurette" key={product.id}>
            <div className="col-md-7 order-md-2">
              <h2 className="featurette-heading fw-normal lh-1">
                {product.productName}
              </h2>
              <address>{product.price}</address>

              <p className="lead">{product.description}</p>
            </div>
            <div className="col-md-5 order-md-1">
              <img
                src={product.imageUrl}
                alt="image of product"
                className="bd-placeholder-img-lg featurette-image img-fluid mx-auto"
              />

              <div className="accordion accordion-flush" id="accordionFlush">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingOne">
                    <button
                      className="accordion-button collapsed"
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
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlush"
                  >
                    <div className="accordion-body">
                      {/* Can be placeholder for product update form */}
                      {/* <UpdateProduct /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      // Placeholder for 404 product not found page
      //   return <ProductNotFound />;
    }
  }
}

const mapState = ({ product }) => ({
  product,
});

const mapDispatch = (dispatch) => ({
  getProduct: (id) => dispatch(fetchProduct(id)),
  deleteProduct: (product) => dispatch(deleteProductThunk(product, history)),
});

export default connect(mapState, mapDispatch)(Product);
