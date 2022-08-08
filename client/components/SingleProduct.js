import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProduct } from "../store/singleProduct";
import { deleteProductThunk } from "../store/products";
import { createOrderThunk } from "../store/orders";
import { createLineItemThunk } from "../store/lineItems";
import { updateLineItemThunk } from "../store/singleLineItem";
// import { db } from '../../server/db'
// import { getLineItems } from '../../server/db/models/Order';
import UpdateProduct from "./UpdateProduct";
import NotFoundPage from "./NotFoundPage";
import ProductReviews from "./ProductReviews";

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

   // TODO: Sorry, unable to properly import order.getLineItems
   handleClick = (product) => {
      // const order = this.props.order;
      // if (!order) {
      //   const newOrder = createOrder();
      //   createLineItem(product, newOrder);
      // } else {
      //   const lineItem = order
      //     .getLineItems()
      //     .find((lineItem) => lineItem.productId === product.id);
      //   if (lineItem) {
      //     this.props.updateLineItem({
      //       ...this.props.lineItems,
      //       orderQuantity: this.props.lineItem.orderQuantity + 1,
      //     });
      //   } else {
      //     lineItem.create({
      //       productId: product.id,
      //       orderId: order.id,
      //     });
      //   }
      // }
   };

   render() {
      const { product } = this.props;
      const { handleClick } = this;

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
                     <button onClick={handleClick(product)}>Add to Cart</button>
                     <div id="accordionFlush">
                        <div>
                           <h2 id="flush-headingOne">
                              <Link to={`/products/${product.id}/add`}>
                                 <button type="button">Add Review</button>
                              </Link>
                           </h2>
                           <div>
                              <div>
                                 <UpdateProduct id={product.id} />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div>
                  <ProductReviews productId={product.id} />
               </div>
            </section>
         );
      } else {
         return <NotFoundPage />;
      }
   }
}

const mapState = ({ product, order, lineItems }) => ({
   product,
   order,
   lineItems,
});

const mapDispatch = (dispatch) => ({
   getProduct: (id) => dispatch(fetchProduct(id)),
   deleteProduct: (product) => dispatch(deleteProductThunk(product, history)),
   createOrder: () => dispatch(createOrderThunk()),
   createLineItem: (order, product) =>
      dispatch(createLineItemThunk(order, product)),
   updateLineItem: (lineItem) => dispatch(updateLineItemThunk(lineItem)),
});

export default connect(mapState, mapDispatch)(Product);
