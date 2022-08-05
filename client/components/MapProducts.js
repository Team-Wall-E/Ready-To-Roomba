import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchProducts, deleteProductThunk } from "../store/products";

function MapProducts(props) {
   return props.products.map((product) => {
      return (
         <div className="col" key={product.id}>
            <div className="card shadow-sm">
               <img
                  className="card-img-top"
                  src={product.imageUrl}
                  alt="image of product"
               />
               <div className="card-body">
                  <h4 className="card-title">
                     <Link to={`/products/${product.id}`}>
                        {product.productName}
                     </Link>
                  </h4>

                  <address className="card-subtitle">{product.price}</address>
                  <p className="card-text">{product.description}</p>
                  <div className="d-flex justify-content-between align-items-center bottom-buttons">
                     <div className="btn-group">
                        <Link
                           type="button"
                           className="btn btn-sm btn-outline-secondary"
                           to={`/products/${product.id}`}
                        >
                           View
                        </Link>
                     </div>
                     <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => props.deleteProduct(product.id)}
                     >
                        X
                     </button>
                  </div>
               </div>
            </div>
         </div>
      );
   });
}

const mapState = ({ products }) => ({
   products,
});

const mapDispatch = (dispatch) => ({
   getProducts: () => dispatch(fetchProducts()),
   deleteProduct: (product) => dispatch(deleteProductThunk(product)),
});

export default connect(mapState, mapDispatch)(MapProducts);
