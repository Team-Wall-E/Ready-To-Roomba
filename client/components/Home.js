import React from 'react';
import { connect } from 'react-redux';
import { isLoggedIn } from '../../server/api/protection';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { firstName, lastName } = props;

  return (
    <div>
      {isLoggedIn && (
        <div>
          <h3>Welcome {firstName} {lastName}!</h3>
        </div>
      )}
    </div>
  )
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    isLoggedIn: !!state.auth.id,
  };
};

export default connect(mapState)(Home);
