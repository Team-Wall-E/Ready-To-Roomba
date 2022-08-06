import React from "react";

const NotFoundPage = (props) => {
   //TODO: fix error about id?
   return (
      <div className="home-page">
         <img
            id="not-found-img"
            src="https://thumbs.dreamstime.com/b/error-concept-white-background-sign-logo-icon-error-concept-simple-vector-icon-123196462.jpg"
         />
         <p>el</p>
         {/* <h3>Whoops, the page at {props.location.pathname} does not exist!</h3> */}
      </div>
   );
};

export default NotFoundPage;