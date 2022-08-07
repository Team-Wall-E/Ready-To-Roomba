import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLineItems } from '../store/lineItems';
import { fetchOrder } from '../store/singleOrder';

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('LINE ITEMS:', this.props.lineItems);
    return (
      <div>
        <h3>Welcome to your cart</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lineItems: state.lineItems,
  };
};

export default connect(mapStateToProps)(Cart);
