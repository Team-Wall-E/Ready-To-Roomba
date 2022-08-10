import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error, address } = props;
  // TODO: add ternary to not show first and last name on login form
  return (
    <div className='d-flex flex-column w-50 m-auto mt-5 text-center form form-signin'>
      <h2>{displayName}</h2>
      <Form onSubmit={handleSubmit} name={name} className='needs-validation'>
        <Form.Group className='mb-3 w-100' controlId='firstName'>
          <Form.Control name='firstName' type='text' placeholder='First Name' />
        </Form.Group>

        <Form.Group className='mb-3 w-100' controlId='lastName'>
          <Form.Control name='lastName' type='text' placeholder='Last Name' />
        </Form.Group>

        <Form.Group className='mb-3 w-100' controlId='address'>
          <Form.Control name='address' type='text' placeholder='Address' />
        </Form.Group>

        <Form.Group className='mb-3 w-100' controlId='email'>
          <Form.Control
            name='email'
            type='email'
            placeholder='Enter email'
            required
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3 w-100' controlId='password'>
          <Form.Control
            name='password'
            type='password'
            placeholder='Password'
            required
          />
        </Form.Group>

        <div>
          <Button type='submit'>{displayName}</Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </Form>
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
