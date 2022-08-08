import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <nav className='d-flex flex-wrap align-items-center justify-content-center justify-content-md-between p-3 mb-4 black-bg'>
    {/* logo */}
    <a href='/home' className='logo'>
      <Image
        lang='en'
        data-id='c3KHuMF'
        data-context='false'
        src='https://i.imgur.com/c3KHuMF.png'
        className='d-flex align-items-center col-md-3 mb-2 mb-md-0 text-black text-decoration-none imgur-embed-pub'
      ></Image>
    </a>
    {/* middle links */}
    <ul className='nav col-12 col-md-auto mb-2 justify-content-center mb-md-0'>
      <li>
        <a href='/home' className='nav-link px-2 link-secondary'>
          Home
        </a>
      </li>
      <li>
        <a href='/products' className='nav-link px-2 link-light'>
          Products
        </a>
      </li>
    </ul>
    {/* far right icons/buttons */}

    <div className='text-end'>
        <div>
          <a href='/cart'>
            <FontAwesomeIcon icon={faCartShopping} />
          </a>
          <a href='/login'>
            <FontAwesomeIcon className='logged-in' icon={faUser} />
          </a>
          <a href='/signup'>
            <FontAwesomeIcon className='logged-out' icon={faUser} />
          </a>
        </div>
        {isLoggedIn &&  (
        <div>
          <a href='/logout'>
            <FontAwesomeIcon className='logged-out' icon={faUser} />
          </a>
          {/* <a href='/orderhistory'>
            <FontAwesomeIcon className='logged-in' icon={faUser} />
          </a> */}
        </div>
      )}
    </div>
  </nav>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
