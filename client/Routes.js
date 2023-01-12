import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm.js";

import Loading from "./components/fallback/Loading";

import AllProducts from "./components/AllProducts";

import Brands from "./components/Brands";
import ProductReviews from "./components/ProductReviews";
import BillingInfo from "./components/BillingInfo.js";
import NotFoundPage from "./components/NotFoundPage";
import OrderHistory from "./components/OrderHistory";
import { me } from "./store";
import { fetchProducts } from "./store/products";
import { fetchCart } from "./store/cart";

// import SingleProduct from "./components/SingleProduct";
// import CreateReview from "./components/CreateReview";
// import UpdateProduct from "./components/UpdateProduct";
// import Cart from "./components/Cart";
// import Checkout from "./components/Checkout.js";
// import UserProfile from "./components/UserProfile.js";
// import AllUsers from "./components/AllUsers.js";

/* LAZY loaded components */
const SingleProduct = lazy(() => import("./components/SingleProduct"));
const CreateReview = lazy(() => import("./components/CreateReview"));
const UpdateProduct = lazy(() => import("./components/UpdateProduct"));
const Cart = lazy(() => import("./components/Cart"));
const Checkout = lazy(() => import("./components/Checkout.js"));
const UserProfile = lazy(() => import("./components/UserProfile.js"));
const AllUsers = lazy(() => import("./components/AllUsers.js"));

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
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <div>
        <Switch>
          {/* This is the ROUTES for ALL visitors */}
          <Route exact path="/" component={AllProducts} />

          <Suspense fallback={<Loading />}>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            {/* TODO: may have to fix users id route */}
            <Route exact path="/users/:id" component={UserProfile} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/products/:id/update" component={UpdateProduct} />
            <Route path="/products/:id/add" component={CreateReview} />
          </Suspense>

          <Route path="billing" component={BillingInfo} />
          <Route exact path="/products" component={AllProducts} />
          {/* TODO: may have to fix users id route */}
          <Route exact path="/brands" component={Brands} />
          <Route path="/products/:id/reviews" component={ProductReviews} />
          {isLoggedIn && (
            <Switch>
              <Suspense fallback={<Loading />}>
                <Route path="/cart" component={Cart} />
                <Route path="/checkout" component={Checkout} />
              </Suspense>

              <Route path="billing" component={BillingInfo} />
              <Route exact path="/users/:id/orders" component={OrderHistory} />
            </Switch>
          )}
          {/* <Route path='/users' component={AllUsers} /> */}
          {isLoggedIn && isAdmin && (
            <Suspense fallback={<Loading />}>
              <Route exact path="/users" component={AllUsers} />
            </Suspense>
          )}
          <Route component={NotFoundPage} />
          <Redirect from="/login" to="/" />
          <Redirect exact to="/" component={AllProducts} />
        </Switch>
      </div>
    );
  }
}

/*** CONTAINER****/
const mapState = (state) => ({
  // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
  // Otherwise, state.auth will be an empty object, and state.auth.id will be falsy
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
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
