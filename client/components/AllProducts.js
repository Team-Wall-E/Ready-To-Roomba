import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/products";

import SearchBar from "./SearchBar";
import MapProducts from "./MapProducts";
import CreateProduct from "./CreateProduct";

export class AllProducts extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: true,
      };
   }

   componentDidMount() {
      this.props.getProducts();
      this.setState({ loading: false });
   }

   render() {
      const loading = (
         <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
         </div>
      );

      const { products } = this.props;

      return (
         <div>
            <div>
               <div>
                  <SearchBar
                     placeholder={"Enter product name..."}
                     products={products}
                  />
               </div>
            </div>

            <section>
               <div>
                  <div>
                     <h1>{this.state.loading && loading}All Products</h1>
                     <p>
                        <Link to="/products/create">Create a new product</Link>
                     </p>
                  </div>
               </div>
            </section>
            <div>
               <div>
                  <div>
                     {products ? (
                        <MapProducts products={products} />
                     ) : (
                        <h3>No Products</h3>
                     )}
                  </div>
               </div>
            </div>
            <div>
               <h2>Add New Product:</h2>
               <CreateProduct products={products} />
            </div>
            <a href="#" id="toTopBtn" />
         </div>
      );
   }
}

const mapState = ({ products }) => ({
   products,
});

const mapDispatch = (dispatch) => ({
   getProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(AllProducts);
