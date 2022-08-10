import React, { Component } from 'react';
import { fetchUser, updateUserThunk, setUser } from '../store/singleUser';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      address: props.user.address,
      email: props.user.email,
      password: props.user.password,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      this.setState({
        firstName: this.props.user.firstName || '',
        lastName: this.props.user.lastName || '',
        address: this.props.user.address || '',
        password: this.props.user.password || '',
        s,
      });
    }
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    // const { firstName, lastName, address, email, password } = this.state;
    // const improvedUser = {
    //   firstName: firstName,
    //   lastName: lastName,
    //   address: address,
    //   email: email,
    //   password: password,
    // };

    this.props.updateUser({ ...this.props.user, ...this.state });

    // this.props.fetchUser(this.props.user.id);
  };

  render() {
    const { firstName, lastName, address, password } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <form className='edit-form needs-validation' onSubmit={handleSubmit}>
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
            type='password'
            className='form-change'
            onChange={handleChange}
            value={password || ''}
          />
          <br />
          <Button type='submit'>Submit</Button>
          <Link to='/home'>
            <Button type='button' variant='secondary'>
              Cancel
            </Button>
          </Link>
        </form>
      </div>
    );
  }
}
const mapState = ({ user }) => ({
  user,
});
const mapDispatch = (dispatch, { history }) => {
  return {
    updateUser: (user) => dispatch(updateUserThunk(user, history)),
    fetchUser: (id) => dispatch(fetchUser(id)),
    clearUser: () => dispatch(setUser({})),
  };
};

export default connect(mapState, mapDispatch)(UpdateUser);