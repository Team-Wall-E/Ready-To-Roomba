import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts, deleteProductThunk } from "../store/products";
import SearchBar from "./SearchBar";
import MapProducts from "./MapProducts";

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

   //TODO: PART 1 FILTERING
   /*
  sortProducts = (type) => {
    const types = {
     brand: 'brand'
    };
    const sortProperty = types[type];
    const { products } = this.props;

    if (sortProperty === 'brand') {
      this.setState({
        ...products.sort((a, b) => {
          return a.brand > b.brand ? 1 : b.brand > a.brand ? -1 : 0;
        }),
      });
    } else {
      this.setState({
        ...products.sort((a, b) => b[sortProperty] - a[sortProperty]),
      });
    }
  };
  */

   render() {
      const loading = (
         <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
         </div>
      );

      const { products } = this.props;

      //TODO: PART 2 FILTERING
      /*
    // const filteredProducts = () => {
    //   const selected = this.state.selectedStudents;
    //   return products.filter((product) => {
    //     if (selected === 'all') return student;
    //     if (selected === 'unregistered') return student.campusId === null;
    //   });
    // };
*/

      return (
         <div className="all-products w-100">
            <div>
               <div>
                  <SearchBar
                     placeholder={"Enter product name..."}
                     products={this.props.products}
                  />
               </div>
            </div>
            <section className="py-5 text-center container">
               <div className="row py-lg-5">
                  <div className="col-lg-6 col-md-8 mx-auto">
                     <h1 className="fw-light">
                        {this.state.loading && loading}All Products
                     </h1>
                     <p>
                        <Link
                           to="/products/create"
                           className="btn btn-primary my-2"
                        >
                           Create a new product
                        </Link>
                     </p>
                  </div>
               </div>
            </section>
            <div className="album py-5 bg-light">
               <div className="container">
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                     {products ? (
                        <MapProducts products={products} />
                     ) : (
                        <h3>No Products</h3>
                     )}
                  </div>
               </div>
            </div>
            <a href="#" id="toTopBtn" className="cd-top" />
         </div>
      );
   }
}

const mapState = ({ products }) => ({
   products,
});

const mapDispatch = (dispatch) => ({
   getProducts: () => dispatch(fetchProducts()),
   deleteProduct: (product) => dispatch(deleteProductThunk(product, history)),
});

export default connect(mapState, mapDispatch)(AllProducts);
