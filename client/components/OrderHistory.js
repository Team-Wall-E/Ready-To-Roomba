import React from "react";
import { loadUserOrdersThunk } from "../store/orders";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class OrderHistory extends React.Component {
    componentDidMount() {
        this.props.loadUserOrdersThunk();
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Order History</h1>
                    <div>
                        {
                            this.props.orders.map(order => {
                                let date = order.updatedAt.slice(0, 10)
                                return (
                                    <div key={order.id}>
                                        <p>Order ID: {order.id}</p>
                                        <p>Order Date: {date[0]}</p>
                                         {/* maybe add more */}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
};

const mapState = (state) => {
    return {
        orders: state.order
    }
};

const mapDispatch = (dispatch) => {
    return {
        thunk: (id) => dispatch(loadUserOrdersThunk(id))
    }
};

export default connect(mapState, mapDispatch)(OrderHistory)