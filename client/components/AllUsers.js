import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/users';
// import MapUsers from './MapUsers';
import Row from 'react-bootstrap/Row';

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
        {users.map((user) => {
          return (
            <Col key={user.id}>
              <Card>
                <Card.Img
                  variant='top'
                  className='card-img-top'
                  src={user.imageUrl}
                  alt='image of user'
                />
                <Card.Body>
                  <Card.Title>
                    <Link to={`/products/${user.id}`}>
                      {user.firstName} {user.lastName}
                    </Link>
                  </Card.Title>
                  <Card.Text>{user.email}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => ({
  users: state.users,
  isAdmin: state.auth.isAdmin,
});

const mapDispatch = (dispatch) => ({
  getUsers: () => dispatch(fetchUsers()),
});

export default connect(mapState, mapDispatch)(AllUsers);
