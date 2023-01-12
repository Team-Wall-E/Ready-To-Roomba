import React from 'react';
import { getUserOrders } from '../store/orders';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';

class OrderHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserOrders();
  }

  render() {
    const orders = this.props.orders;
    return (
      <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-md-between p-5 mb-5'>
        <h2>Order History</h2>
        <Table className='mt-5'>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Status</th>
              <th>Date</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.status}</td>
                  <td>{order.updatedAt}</td>
                  <td>TODO</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
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
    getUserOrders: () => dispatch(getUserOrders()),
  };
};

export default connect(mapState, mapDispatch)(OrderHistory);
