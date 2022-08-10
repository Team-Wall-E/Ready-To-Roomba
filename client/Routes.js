import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm.js';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import Brands from './components/Brands';
import ProductReviews from './components/ProductReviews';
import CreateReview from './components/CreateReview';
import UpdateProduct from './components/UpdateProduct';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import NotFoundPage from './components/NotFoundPage';
import { me } from './store';
import { fetchProducts } from './store/products';
import { fetchCart } from './store/cart';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.fetchCart();
    }
  }

  render() {
    const { isLoggedIn } = this.props;
   
    return (
      <div>
        <Switch>
          {/* This is the ROUTES for ALL visitors */}
          
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/home' component={AllProducts} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/cart/checkout' component={Checkout} />
          <Route exact path='/products' component={AllProducts} />
          <Route path='/products/:id' component={SingleProduct} />
          <Route exact path='/brands' component={Brands} />
          <Route path='/brands/:id' component={SingleProduct} />
          <Route path='/products/:id/update' component={UpdateProduct} />
          <Route path='/products/:id/reviews' component={ProductReviews} />
          <Route path='/products/:id/add' component={CreateReview} />
          {isLoggedIn && (
            <Switch>
              {/* <Route exact path='/orderhistory' component={OrderHistory} /> */}
              <Route exact path='/cart' component={Cart} />
              <Route exact path='/cart/checkout' component={Checkout} />
            </Switch>
          )}
          <Route component={NotFoundPage} />
          <Redirect from='/login' to='/home' />
          <Redirect to='/home' />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => ({
  // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
  // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
  isLoggedIn: !!state.auth.id,
  isAdmin: !!state.auth.isAdmin,
  logOut: state.logout,
});

const mapDispatch = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    fetchProducts: () => dispatch(fetchProducts()),
    loadInitialData() {
      dispatch(me());
    },
    // logOut: () => dispatch(logout())
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
