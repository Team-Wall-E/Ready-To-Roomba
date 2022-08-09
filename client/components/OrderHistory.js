import React from 'react';
import { getUserOrders } from '../store/user';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class OrderHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('ORDERS: ', this.props.orders);
    return (
      <div>
        <div>
          <h1>Order History</h1>
          <div>
            {this.props.orders.map((order) => {
              let date = order.updatedAt.slice(0, 10);
              return (
                <div key={order.id}>
                  <p>Order ID: {order.id}</p>
                  <p>Order Date: {date[0]}</p>
                  {/* maybe add more */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    orders: state.orders,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getOrders: () => dispatch(getUserOrders()),
  };
};

export default connect(mapState, mapDispatch)(OrderHistory);
