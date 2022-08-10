import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers, deleteUserThunk } from '../store/users';
import { fetchUser } from '../store/singleUser';
import UpdateUser from './UpdateUser';
import AllUsers from './AllUsers';
import CreateProduct from './CreateProduct';
import Sidebar from './Sidebar';
import Button from 'react-bootstrap/Button';

//TODO: whenever orderHistory is finished
// import OrderHistory from './OrderHistory';
// react hooks

/*
User - updates
isAdmin - extra functionality
*/

export const UserProfile = (props) => {
  const { firstName, lastName, isAdmin, id } = props;
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAllUsers, setshowAllUsers] = useState(false);

  return (
    <div className='row'>
      <Sidebar className='col-4' />
      <section className='col-8 mt-5'>
        <div>
          <div>
            {id ? (
              <h3>
                Welcome {firstName} {lastName}
              </h3>
            ) : (
              <h3> Welcome lurking stranger!</h3>
            )}
          </div>
        </div>
        <h6>
          <br></br>
          <Button onClick={() => setShowUpdateUser(!showUpdateUser)}>
            Update Your Information
          </Button>
          {showUpdateUser && <UpdateUser>show/hide typography</UpdateUser>}
        </h6>
        {/* TODO: possibly order history? */}
        {/* <OrderHistory/> */}
        <br></br>
        {isAdmin ? (
          <div>
            <h1>Hello, Admin!</h1>
            <div>
              <h6>Edit a Product</h6>{' '}
              <Link to={`/products/`}>
                {' '}
                <Button>To Product</Button>
              </Link>{' '}
            </div>
            <br></br>
            <div>
              <h6>
                Add A New Product <br></br>
                <Button onClick={() => setShowAddProduct(!showAddProduct)}>
                  Add
                </Button>
                {showAddProduct && (
                  <CreateProduct>show/hide typography</CreateProduct>
                )}
              </h6>
            </div>
            <br></br>
            <h6>
              Users List:<br></br>
              <Button onClick={() => setshowAllUsers(!showAllUsers)}>
                Update Users List
              </Button>
              {showAllUsers && <AllUsers>show/hide typography</AllUsers>}
            </h6>
            <br></br>
          </div>
        ) : null}
      </section>
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
});

export default connect(mapState, mapDispatch)(UserProfile);
