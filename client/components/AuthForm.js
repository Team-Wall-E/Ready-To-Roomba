import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error, address } = props;
  // TODO: add ternary to not show first and last name on login form
  return (
    <div>
      <form onSubmit={handleSubmit} name={name} className='needs-validation'>
        <div>
          <label htmlFor='firstName'>
            <small>First Name</small>
          </label>
          <input name='firstName' type='text' required />
        </div>
        <div>
          <label htmlFor='lastName'>
            <small>Last Name</small>
          </label>
          <input name='lastName' type='text' required />
        </div>
        <div>
          <label htmlFor='email' required>
            <small>Email</small>
          </label>
          <input name='email' type='text' required />
        </div>
        <div>
          <label htmlFor='password' required>
            <small>Password</small>
          </label>
          <input name='password' type='password' />
        </div>
        <div>
          <label htmlFor='address'>
            <small>Address</small>
          </label>
          <input name='address' type='text' />
        </div>
        <div>
          <button type='submit'>{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      const address = evt.target.address.value;
      dispatch(
        authenticate(firstName, lastName, email, password, formName, address)
      );
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
