import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLineItems } from '../store/lineItems';
import { fetchOrder } from '../store/singleOrder';

class Cart extends Component {
  constructor(props) {
    super(props);

    const cartForm = {};
    this.props.cart.map(
      (lineItem, index) =>
        (cartForm[lineItem.productId] = {
          Id: lineItem.productId,
          Quantity: lineItem.orderQuantity,
        })
    );
    this.state = { cartForm };
  }

  // handleChangeCartQuantity = (e, linelineItemId) => {
  //   const cartForm = Object.assign({}, this.state.cartForm);
  //   cartForm[lineItem.productId].quantity = parseInt(e.target.value);
  //   this.setState(cartForm);
  // };

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
