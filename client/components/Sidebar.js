import React from 'react';
import Button from 'react-bootstrap/Button';

// TODO: change a to Link
export default function Sidebar(props) {
  return (
    <div
      className='d-flex flex-column flex-shrink-0 p-3 black-bg'
      style={{ width: 280 }}
    >
      <a
        href='/'
        className='d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none'
      >
        <span className='fs-4'>My Account</span>
      </a>
      <hr></hr>
      <ul className='nav nav-pills flex-column mb-auto'>
        <li className='nav-item'>
          <a href='#' className='nav-link active' aria-current='page'>
            Home
          </a>
        </li>
        <li>
          <a href='#' className='nav-link text-white'>
            Dashboard
          </a>
        </li>
        <li>
          <a href='#' className='nav-link text-white'>
            Orders
          </a>
        </li>
        <li>
          <a href='#' className='nav-link text-white'>
            Products
          </a>
        </li>
        <li>
          <a href='#' className='nav-link text-white'>
            Customers
          </a>
        </li>
        <li className='border-top my-3 text-white'></li>
        <li className='mb-1 text-white'>
          <Button className='btn d-inline-flex align-items-center rounded border-0 text-white'>
            Account
          </Button>
          <div>
            <ul className='list-unstyled fw-normal pb-1 small'>
              <li>
                <a
                  href='#'
                  className='d-inline-flex text-decoration-none rounded text-white'
                >
                  New...
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='d-inline-flex text-decoration-none rounded text-white'
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='d-inline-flex text-decoration-none rounded text-white'
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='d-inline-flex text-decoration-none rounded text-white'
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}
