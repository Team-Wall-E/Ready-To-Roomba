import React, { Component } from 'react';
import { updateUserThunk, fetchUser, setUser } from '../store/singleUser';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { updateUser, fetchUser, id } = this.props;
    const { firstName, lastName, address, email, password } = this.state;
    const improvedUser = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      email: email,
      password: password,
    };
    updateUser(id, improvedUser);
    fetchUser(id);
  };

  render() {
    const { firstName, lastName, address, email, password } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <form
          id='edit-form'
          onSubmit={handleSubmit}
          className='needs-validation'
        >
          <label htmlFor='firstName'>First Name:</label>
          <input
            name='firstName'
            className='form-change'
            onChange={handleChange}
            value={firstName || ''}
          />
          <br />
          <label htmlFor='lastName'>Last Name:</label>
          <input
            name='lastName'
            className='form-change'
            onChange={handleChange}
            value={lastName || ''}
          />
          <br />
          <label htmlFor='address'>Address:</label>
          <input
            name='address'
            className='form-change'
            onChange={handleChange}
            value={address || ''}
          />
          <br />
          <label htmlFor='password'>Password:</label>
          <input
            name='password'
            type = 'password'
            className='form-change'
            onChange={handleChange}
            value={password || ''}
          />
          <br />
          <button type='submit'>Submit</button>
          <Link to='/home'>
            <button type='button'>Cancel</button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateUser: (id, user) => dispatch(updateUserThunk(id, user)),
    fetchUser: (id) => dispatch(fetchUser(id)),
    clearUser: () => dispatch(setUser({})),
  };
};

export default connect(null, mapDispatch)(UpdateUser);
