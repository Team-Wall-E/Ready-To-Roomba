import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
import SearchBar from './SearchBar';
import MapProducts from './MapProducts';
import Row from 'react-bootstrap/Row';
import CreateProduct from './CreateProduct';

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
      <div className='spinner-border text-secondary' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    );

    const { products } = this.props;

    return (
      <div className='all-products w-100'>
        <div class='position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light hero-image'>
          <div class='p-lg-5 mx-auto my-5'>
            <h1 class='display-4 fw-normal text-light'>
              {this.state.loading && loading}Shop
            </h1>
          </div>
        </div>

        <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-md-between p-5 mb-4'>
          <SearchBar
            placeholder={'Enter product name...'}
            products={products}
            className='d-flex align-items-center mb-2 mb-md-0'
          />

          <div>
            <label>Filter:</label>
            <select
              className='custom-select text-end'
              value={this.state.selectedProducts}
              onChange={this.selectProducts}
            >
              <option defaultValue='all'>All Products</option>
              <option value='brand'>Brand Name</option>
            </select>
          </div>
        </div>

        <div className='p-5'>
          <Row xs={1} md={4} className='g-4'>
            {products ? (
              <MapProducts products={products} />
            ) : (
              <h3>No Products</h3>
            )}
          </Row>

          <h2>Add New Product:</h2>
          <CreateProduct products={products} />
        </div>
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
