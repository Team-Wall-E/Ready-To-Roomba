import axios from 'axios';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART = 'UPDATE_CART';
export const INC_QUANTITY = 'INC_QUANTITY';
export const DEC_QUANTITY = 'DEC_QUANTITY';
// export const EMPTY_CART = 'EMPTY_CART';

export const addToCart = (id) => {
  return {
    type: ADD_TO_CART,
    id,
  };
};

export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    id,
  };
};

export const updateCart = (id) => {
  return {
    type: UPDATE_CART,
    id,
  };
};

// export const increaseQuantity = (id) => {
//   return {
//     type: INC_QUANTITY,
//     id,
//   };
// };

// export const decreaseQuantity = (id) => {
//   return {
//     type: DEC_QUANTITY,
//     id,
//   };
// };

export default function cartReducer(lineItems = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      console.log('LINE ITEMS:', lineItems);
      console.log('ACTION:', action.id);
      // if item exists add to quantity
      // else add to list

      let itemExists = lineItems.find((item) => item.id === action.id);

      if (itemExists) {
        console.log('ITEM EXISTS:', lineItems);
        return {
          ...lineItems,
          lineItems: lineItems.map((lineItem) =>
            lineItem.productId === action.id
              ? { ...lineItem, orderQuantity: lineItem.orderQuantity++ }
              : lineItem
          ),
        };
      } else {
        console.log('NEW ITEM:', lineItems);
        return [...lineItems, action.id];
      }

    case REMOVE_FROM_CART:
      const removeLineItems = lineItems.filter((lineItem) => {
        if (lineItem.id === action.id) {
          return false;
        }
        return true;
      });
      return removeLineItems;

    // TODO: Might be buggy
    case UPDATE_CART:
      const prevCart = Object.keys(action.payload).map((key, index) => {
        return action.payload[key];
      });

      doesItemExist = false;

      const updatedLineItems = lineItems.map((lineItem) => {
        const itemFound = prevCart.find(
          (element) => element.id === lineItem.id
        );
        if (itemFound) {
          lineItem.orderQuantity = itemFound.orderQuantity;
          doesItemExist = true;
        }
        return lineItem;
      });

      if (doesItemExist) {
        return updatedLineItems;
      }

      return lineItems;

    default:
      return lineItems;
  }
}
