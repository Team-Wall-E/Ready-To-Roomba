import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/users';
import UpdateUser from './UpdateUser';

export class AllUsers extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <h4>Name:</h4>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <div>
                <h6>
                  {user.firstName} {user.lastName}
                </h6>
              </div>
              <div> {user.email} </div>
              <UpdateUser />
              <br />
              <br />
            </div>
          );
        })}
        <br></br>
        <h6>Email:</h6>
        {users.map((user) => {
          return <div key={user.id}>{user.email}</div>;
        })}
      </div>
    );
  }
}

const mapState = (state) => ({
  users: state.users,
});

const mapDispatch = (dispatch) => ({
  getUsers: () => dispatch(fetchUsers()),
});

export default connect(mapState, mapDispatch)(AllUsers);
