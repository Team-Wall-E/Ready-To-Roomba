import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../store/users';
import { fetchUser } from '../store/singleUser';
import UpdateUser from './UpdateUser';
import AllUsers from './AllUsers';
import CreateProduct from './CreateProduct';

//TODO: whenever orderHistory is finished

/*
User - updates
isAdmin - extra functionality
*/

export const UserProfile = (props) => {
  const { firstName, lastName, isAdmin, id, imageUrl } = props;
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAllUsers, setshowAllUsers] = useState(false);

  return (
    <div>
      <div>
        <div>
          {id ? (
            <h3>
              {' '}
              Welcome {firstName} {lastName}
              <img className='display-image' src={imageUrl} />
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
      {/* TODO: possibly order history? */}
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
          <h6>
            Users List:<br></br>
            <button onClick={() => setshowAllUsers(!showAllUsers)}>
              Update Users List
            </button>
            {showAllUsers && <AllUsers>show/hide typography</AllUsers>}
          </h6>
          <br></br>
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
    imageUrl: state.auth.imageUrl,
    user: state.user,
    users: state.users,
  };
};

const mapDispatch = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  getUser: (id) => dispatch(fetchUser(id)),
});

export default connect(mapState, mapDispatch)(UserProfile);
