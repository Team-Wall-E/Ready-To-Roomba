import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLineItems } from '../store/lineItems';
import { fetchOrder } from '../store/singleOrder';

export class Cart extends React.Component {
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
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

    const { lineItems } = this.props;

    return (
      <div>
        <section>
          <div>
            <div>
              <h1>{this.state.loading && loading}Cart</h1>
            </div>
          </div>
        </section>
        <div>
          <div>
            <div>
              {products ? (
                <MapProducts products={products} />
              ) : (
                <h3>No Products</h3>
              )}
            </div>
          </div>
        </div>
        <a href="#" id="toTopBtn" />
      </div>
    );
  }
}

const mapState = ({ order, lineItems }) => ({
  order,
  lineItems,
});

const mapDispatch = (dispatch) => ({
  getLineItems: () => dispatch(fetchLineItems()),
  getOrder: () => dispatch(fetchOrder()),
});

export default connect(mapState, mapDispatch)(Cart);
