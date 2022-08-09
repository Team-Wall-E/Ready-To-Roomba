import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ isLoggedIn }) => (
  <nav className='d-flex flex-wrap align-items-center justify-content-center justify-content-md-between p-3 mb-4 black-bg'>
    {/* logo */}
    <Link to='/home' className='logo'>
      <Image
        lang='en'
        data-id='c3KHuMF'
        data-context='false'
        src='https://i.imgur.com/c3KHuMF.png'
        className='d-flex align-items-center col-md-3 mb-2 mb-md-0 text-black text-decoration-none imgur-embed-pub'
      ></Image>
    </Link>
    {/* middle links */}
    <ul className='nav col-12 col-md-auto mb-2 justify-content-center mb-md-0'>
      <li>
        <Link to='/home' className='nav-link px-2 link-secondary'>
          Home
        </Link>
      </li>
      <li>
        <Link to='/home' className='nav-link px-2 link-light'>
          Products
        </Link>
      </li>
    </ul>
    {/* far right icons/buttons */}

    <div className='text-end'>
      {!isLoggedIn ? (
        <div>
          <Link to='/cart'>
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
          <Button variant='light' href='/login'>
            Login
          </Button>
          <Button variant='light' href='/signup'>
            Signup
          </Button>
        </div>
      ) : (
        <div>
          <Link to='/cart'>
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
          <div>
            <Button variant='light' href='/logout' onClick={() => logout()}>
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  </nav>
);

/*** CONTAINER***/
const mapState = (state) => ({
  isLoggedIn: !!state.auth.id,
  isAdmin: !!state.auth.isAdmin,
});

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
