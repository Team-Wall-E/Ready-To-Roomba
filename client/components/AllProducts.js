import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProductThunk } from '../store/products';

export class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getProducts();
    this.setState({ loading: false });
  }

  render() {
    const loading = (
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

    const { products } = this.props;

    const MapProducts = () => {
      return products.map((product) => {
        return (
          <div className="col" key={product.id}>
            <div className="card shadow-sm">
              <img
                className="card-img-top"
                src={product.imageUrl}
                alt="image of product"
              />
              <div className="card-body">
                <h4 className="card-title">
                  <Link to={`/products/${product.id}`}>
                    {product.productName}
                  </Link>
                </h4>

                <address className="card-subtitle">{product.price}</address>
                <p className="card-text">{product.description}</p>
                <div className="d-flex justify-content-between align-items-center bottom-buttons">
                  <div className="btn-group">
                    <Link
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      to={`/products/${product.id}`}
                    >
                      View
                    </Link>
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.props.deleteProduct(product.id)}
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      });
    };

    return (
      <div className="all-products w-100">
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">
                {this.state.loading && loading}All Products
              </h1>
              <p>
                <Link to="/products/create" className="btn btn-primary my-2">
                  Create a new product
                </Link>
              </p>
            </div>
          </div>
        </section>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {products ? <MapProducts /> : <h3>No Products</h3>}
            </div>
          </div>
        </div>
        <a href="#" id="toTopBtn" className="cd-top" />
      </div>
    );
  }
}

const mapState = ({ products }) => ({
  products,
});

const mapDispatch = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
  deleteProduct: (product) => dispatch(deleteProductThunk(product, history)),
});

export default connect(mapState, mapDispatch)(AllProducts);
