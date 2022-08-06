import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import ordersReducer from './orders';
import productsReducer from './products';
import productReducer from './singleProduct';
import ordersReducer from './orders';
import orderReducer from './singleOrder';
import lineItemReducer from './singleLineItem';
import lineItemsReducer from './lineItems';

const reducer = combineReducers({
  auth,
  products: productsReducer,
  product: productReducer,
  orders: ordersReducer,
  order: orderReducer,
  lineItem: lineItemReducer,
  lineItems: lineItemsReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
