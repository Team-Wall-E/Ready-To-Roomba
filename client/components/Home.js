import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import UpdateProduct from './UpdateProduct';
import { Link } from 'react-router-dom';
import {
  fetchUsers,
  createUserThunk,
  deleteUserThunk,
} from '../store/allUsers';
import { fetchUser, updateUserThunk } from '../store/singleUser';
import UpdateUser from './UpdateUser';
import CreateProduct from './CreateProduct';

//TODO: whenever orderHistory is finished
// import OrderHistory from './OrderHistory';
// react hooks

/*
User - updates
isAdmin - extra functionality
*/

export const Home = (props) => {
  const { firstName, lastName, isAdmin, id } = props;
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  return (
    <div>
      <div>
        <div>
          {id ? (
            <h3>
              {' '}
              Welcome {firstName} {lastName}
            </h3>
          ) : (
            <h3> Welcome lurking stranger!</h3>
          )}
        </div>
      </div>
      <h6>
        <br></br>
        <button onClick={() => setShowUpdateUser(!showUpdateUser)}>
          Update Your Information
        </button>
        {showUpdateUser && <UpdateUser>show/hide typography</UpdateUser>}
      </h6>
      {/* <OrderHistory/> */}
      <br></br>
      {isAdmin ? (
        <div>
          <h1>Hello, Admin!</h1>
          <div>
            <h6>Edit a Product</h6>{' '}
            <Link to={`/products/`}>
              {' '}
              <button>To Product</button>
            </Link>{' '}
          </div>
          <br></br>
          <div>
            <h6>
              Add A New Product <br></br>
              <button onClick={() => setShowAddProduct(!showAddProduct)}>
                Add
              </button>
              {showAddProduct && (
                <CreateProduct>show/hide typography</CreateProduct>
              )}
            </h6>
          </div>

          <br></br>
          {/* TODO: add redirect to allproducts */}
        </div>
      ) : null}
    </div>
  );
};

const mapState = (state) => {
  return {
    id: state.auth.id,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    isAdmin: state.auth.isAdmin,
    user: state.user,
    users: state.users,
  };
};

const mapDispatch = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  getUser: (id) => dispatch(fetchUser(id)),
  deleteUser: (id) => dispatch(deleteUserThunk(id, history)),
  addToCart: (product) => dispatch(addToCartThunk(product)),
});

export default connect(mapState, mapDispatch)(Home);
