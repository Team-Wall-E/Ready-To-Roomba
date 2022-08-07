import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <nav className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 black-bg">
    {/* logo */}
    <Image
      src="logo.png"
      href="/home"
      className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-black text-decoration-none"
    ></Image>
    {/* middle links */}
    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
      <li>
        <a href="/home" className="nav-link px-2 link-secondary">
          Home
        </a>
      </li>
      <li>
        <a href="/products" className="nav-link px-2 link-light">
          Products
        </a>
      </li>
    </ul>
    {/* far right icons/buttons */}

    <div className="col-md-3 text-end">
      {isLoggedIn ? (
        <Button variant="light" href="/logout">
          Logout
        </Button>
      ) : (
        <div>
          <Button variant="light" href="/login">
            Login
          </Button>
          <Button variant="light" href="/signup">
            Sign-up
          </Button>
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
