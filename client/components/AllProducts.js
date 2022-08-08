import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/products';
import SearchBar from './SearchBar';
import MapProducts from './MapProducts';
import Row from 'react-bootstrap/Row';
import CreateProduct from "./CreateProduct";


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

    return (
      <div className="all-products w-100">
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">
                {this.state.loading && loading}All Products
              </h1>

              <Link to="/products/create" className="btn btn-primary my-2">
                Create a new product
              </Link>
              <br />
              <SearchBar
                placeholder={'Enter product name...'}
                products={products}
              />

              <select
                className="custom-select"
                value={this.state.selectedProducts}
                onChange={this.selectProducts}
              >
                <option defaultValue="all">Filter by</option>
                <option value="all">All Products</option>
                <option value="brand">Brand Name</option>
              </select>
            </div>
          </div>
        </section>

        <Row xs={1} md={4} className="g-4">
          {products ? (
            <MapProducts products={products} />
          ) : (
            <h3>No Products</h3>
          )}
        </Row>

        <div>
          <div>
            <div>
              {products ? (
                <MapProducts products={products} />
              ) : (
                <h3>No Products</h3>
              )}
            </div>
          </div>
        </div>
        <div>
               <h2>Add New Product:</h2>
               <CreateProduct products={products} />
            </div>
        <a href="#" id="toTopBtn" />
      </div>
    );
  }
}

const mapState = ({ products }) => ({
  products,
});

const mapDispatch = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(AllProducts);
