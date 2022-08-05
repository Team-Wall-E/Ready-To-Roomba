import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
   const { fullName } = props;

   return (
      <div>
         <h3>Welcome, {fullName}</h3>
      </div>
   );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
   return {
      fullName: state.auth.username,
   };
};

export default connect(mapState)(Home);

/* TODO : USER COMPONENT
Change username to fullName
*/
