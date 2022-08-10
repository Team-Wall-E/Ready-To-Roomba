import React from 'react';
import { getUserOrders } from '../store/orders';
import { connect } from 'react-redux';
import auth from '../store/auth';
import { Login } from './AuthForm';

class OrderHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserOrders();
  }

  render() {
    console.log('ORDERS: ', this.props.getUserOrders);
    if (!auth.id) {
      return <Login />;
    } else {
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
}

const mapState = (state) => {
  return {
    orders: state.orders,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUserOrders: () => dispatch(getUserOrders()),
  };
};

export default connect(mapState, mapDispatch)(OrderHistory);
