import React from 'react';
import { connect } from 'react-redux';

//TODO: whenever orderHistory is finished
// import OrderHistory from './OrderHistory';
// react hooks 

/*
User - updates
isAdmin - extra functionality
*/

export const Home = (props) => {
  const { firstName, lastName, isAdmin } = props;

  return (
    <div>
      <h3>Welcome {firstName} {lastName}</h3>
      {/* <OrderHistory/> */}

    </div>
  );
};


const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    isAdmin: state.auth.isAdmin,
  };
};

export default connect(mapState)(Home);
