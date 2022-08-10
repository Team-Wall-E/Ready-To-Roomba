import React, { Component } from 'react';
import {
  updateProductThunk,
  fetchProduct,
  setProduct,
} from '../store/singleProduct';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      brand: '',
      description: '',
      inventoryQty: '',
      price: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { updateProduct, fetchProduct, id } = this.props;
    const { productName, brand, description, price } = this.state;
    const improvedProduct = {
      productName: productName,
      brand: brand,
      description: description,
      price: price,
    };
    updateProduct(id, improvedProduct);
    fetchProduct(id);
  };

  render() {
    const { productName, brand, description, price } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <h2>Update Product:</h2>
        <form
          id='edit-form'
          onSubmit={handleSubmit}
          className='needs-validation'
        >
          <label htmlFor='productName'>Name:</label>
          <input
            name='productName'
            className='form-change'
            onChange={handleChange}
            value={productName || ''}
            required
          />
          <br />
          <label htmlFor='brand'>Brand:</label>
          <input
            name='brand'
            className='form-change'
            onChange={handleChange}
            value={brand || ''}
            required
          />
          <br />
          <label htmlFor='description'>Description:</label>
          <input
            name='description'
            className='form-change'
            onChange={handleChange}
            value={description || ''}
            required
          />
          <br />
          <label htmlFor='price'>Price:</label>
          <input
            name='price'
            className='form-change'
            onChange={handleChange}
            value={price || ''}
            required
          />
          <br />
          <Button type='submit'>Submit</Button>
          <Link to='/'>
            <Button type='button'>Cancel</Button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateProduct: (id, product) => dispatch(updateProductThunk(id, product)),
    fetchProduct: (id) => dispatch(fetchProduct(id)),
    clearProduct: () => dispatch(setProduct({})),
  };
};

export default connect(null, mapDispatch)(UpdateProduct);
