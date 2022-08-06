import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {/* {isLoggedIn ? (
          <Switch>
            <Route path="/" component={Home} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/products/:id" component={SingleProduct} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/products/:id" component={SingleProduct} />
          </Switch>
        )} */}
        <Switch>
          {/* This is the ROUTES for ALL visitors */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={Home} />
          <Redirect from="/login" to="/home" />
          <Route exact path="/products" component={AllProducts} />
          <Route exact path="/products/:id" component={SingleProduct} />

          {isLoggedIn && (
            // These are the routes available for the users LOGGED IN
            <Switch>
              <Route path="/home" component={Home} />
              <Redirect to="/home" />
              <Route exact path="/products" component={AllProducts} />
              <Route exact path="/products/:id" component={SingleProduct} />
            </Switch>
          )}
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
