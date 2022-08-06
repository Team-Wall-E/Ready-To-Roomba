import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProduct } from "../store/singleProduct";
import { deleteProductThunk } from "../store/products";
import UpdateProduct from "./UpdateProduct";
import NotFoundPage from "./NotFoundPage";

class Product extends React.Component {
   componentDidMount() {
      const { id } = this.props.match.params;
      this.props.getProduct(id);
   }

   componentDidUpdate(prevProps) {
      if (prevProps.product.id !== this.props.product.id) {
         this.props.getProduct(this.props.product.id);
      }
   }

   render() {
      const { product } = this.props;

      if (product) {
         return (
            <section key={product.id}>
               <div key={product.id}>
                  <div>
                     <h2>{product.productName}</h2>
                     <address>{product.price}</address>

                     <p>{product.description}</p>
                  </div>
                  <div>
                     <img src={product.imageUrl} alt="image of product" />

                     <div id="accordionFlush">
                        <div>
                           <div id="flush-collapseOne">
                              <div>
                                 <UpdateProduct id={product.id} />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         );
      } else {
         return <NotFoundPage />;
      }
   }
}

const mapState = ({ product }) => ({
   product,
});

const mapDispatch = (dispatch) => ({
   getProduct: (id) => dispatch(fetchProduct(id)),
   deleteProduct: (product) => dispatch(deleteProductThunk(product, history)),
});

export default connect(mapState, mapDispatch)(Product);
