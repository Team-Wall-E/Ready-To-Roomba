import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
import Brands from './Brands';

export class AllProducts extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const loading = (
      <div className='spinner-border text-secondary' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    );

    return (
      <div className='all-products w-100'>
        <div className='position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light hero-image'>
          <div className='p-lg-5 mx-auto my-5'>
            <h1 className='display-4 fw-normal text-light'>Shop</h1>
          </div>
        </div>
        <Brands />
      </div>
    );
  }
}

const mapState = (state) => ({
  products: state.products,
  isAdmin: state.auth.isAdmin,
});

const mapDispatch = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(AllProducts);
