import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser, updateUserThunk } from "../store/singleUser";
// TODO: import Updateuser from './Updateuser';
// TODO: import userNotFound from './userNotFound';

class user extends React.Component {
   componentDidMount() {
      const { id } = this.props.match.params;
      this.props.getUser(id);
   }

   componentDidUpdate(prevProps) {
      if (prevProps.user.id !== this.props.user.id) {
         this.props.getUser(this.props.user.id);
      }
   }

   render() {
      const { user } = this.props;
      console.log("user", user);
      console.log("props", this.props);
      if (user) {
         return (
            <p>Hello</p>
            //     <section key={user.id}>
            //       <div key={user.id}>
            //         <div>
            //           <h2>{user.userName}</h2>
            //           <address>{user.price}</address>

            //           <p>{user.description}</p>
            //         </div>
            //         <div>
            //           <img src={user.imageUrl} alt="image of user" />

            //           <div id="accordionFlush">
            //             <div>
            //               <h2 id="flush-headingOne">
            //                 <button
            //                   type="button"
            //                   data-bs-toggle="collapse"
            //                   data-bs-target="#flush-collapseOne"
            //                   aria-expanded="false"
            //                   aria-controls="flush-collapseOne"
            //                 >
            //                   Edit user
            //                 </button>
            //               </h2>
            //               <div
            //                 id="flush-collapseOne"
            //                 aria-labelledby="flush-headingOne"
            //                 data-bs-parent="#accordionFlush"
            //               >
            //                 <div>
            //                   {/* TODO: Can be placeholder for user update form */}
            //                   {/* TODO: <UpdateUser/> */}
            //                 </div>
            //               </div>
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //     </section>
         );
      } else {
         return <p>Fake user!</p>;
         // TODO: Placeholder for 404 user not found page
         // TODO:  return <UserNotFound />;
      }
   }
}

const mapState = ({ user }) => ({
   user,
});

const mapDispatch = (dispatch) => ({
   getUser: (id) => dispatch(fetchUser(id)),
   deleteUser: (user) => dispatch(deleteUserThunk(user, history)),
});

export default connect(mapState, mapDispatch)(user);
