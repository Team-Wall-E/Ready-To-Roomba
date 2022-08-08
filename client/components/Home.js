import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { firstName, lastName } = props;

  return (
    <div>
      <h3>Welcome {firstName} {lastName}</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
    lastName: state.auth.lastName
  };
};

export default connect(mapState)(Home);
