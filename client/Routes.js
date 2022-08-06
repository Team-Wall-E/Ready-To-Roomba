import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import WelcomeUser from "./components/WelcomeUser";
import NotFoundPage from "./components/NotFoundPage";
import { me } from "./store";

/**
 * COMPONENT
 */
class Routes extends Component {
   componentDidMount() {
      this.props.loadInitialData();
   }

   render() {
      const { isLoggedIn } = this.props;
      /*
redirect user component via id from thunk fetchUser(id)
grab id from param or from where?
*/
      console.log(this.props);
      return (
         <div>
            {isLoggedIn ? (
               <Switch>
                  <Route path="/" component={Home} />
                  <Redirect to="/users/:id" component={WelcomeUser} />
                  <Route exact path="/products" component={AllProducts} />
                  <Route exact path="/products/:id" component={SingleProduct} />
                  <Route component={NotFoundPage} />
               </Switch>
            ) : (
               <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={Signup} />
                  <Route exact path="/products" component={AllProducts} />
                  <Route exact path="/products/:id" component={SingleProduct} />
                  <Route component={NotFoundPage} />
               </Switch>
            )}
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
