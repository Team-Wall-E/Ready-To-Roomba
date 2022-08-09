import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProductThunk } from '../store/products';

class CreateProduct extends Component {
  constructor() {
    super();
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { products, createProduct } = this.props;
    createProduct({ ...products, ...this.state });

    //TODO: clear the create form
    // const form = document.getElementById("create-form");
    // form.childNodes.forEach((input) => {
    //    input.value = "";
    // });
  };

  render() {
    const { products } = this.props;
    const { productName, brand, description, price, inventoryQty } = products;
    const { handleSubmit, handleChange } = this;

    return (
      <form
        id='create-form'
        className='needs-validation'
        onSubmit={handleSubmit}
      >
        <div className='form-group'>
          <label htmlFor='productName'>Name:</label>
          <input
            name='productName'
            type='text'
            className='form-control'
            onChange={handleChange}
            value={productName}
            required
          />
          <div className='invalid-feedback'>Please enter a name.</div>
        </div>
        <br />
        <div className='form-group'>
          <label htmlFor='brand'>Brand:</label>
          <input
            name='brand'
            type='text'
            className='form-control'
            onChange={handleChange}
            value={brand}
            required
          />
          <div className='invalid-feedback'>Please enter a brand.</div>
        </div>
        <br />
        <div className='form-group'>
          <label htmlFor='description'>Description:</label>
          <textarea
            name='description'
            className='form-control'
            onChange={handleChange}
            value={description}
            rows='3'
            required
          />
        </div>
        <br />
        <div className='form-group'>
          <label htmlFor='price'>Price:</label>
          <textarea
            name='price'
            className='form-control'
            onChange={handleChange}
            value={price}
            rows='3'
            required
          />
        </div>
        <br />
        <div className='form-group'>
          <label htmlFor='inventoryQty'>Quantity:</label>
          <textarea
            name='inventoryQty'
            className='form-control'
            onChange={handleChange}
            value={inventoryQty}
            rows='3'
            required
          />
        </div>
        <br />
        <button type='submit'>Submit</button>
        <Link to='/products'>
          <button type='button'>Cancel</button>
        </Link>
      </form>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch, { history }) => ({
  createProduct: (product) => dispatch(createProductThunk(product, history)),
});

export default connect(mapState, mapDispatch)(CreateProduct);
