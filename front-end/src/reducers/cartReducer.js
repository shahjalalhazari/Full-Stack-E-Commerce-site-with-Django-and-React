/* eslint-disable no-case-declarations */
import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  ORDER_PAYMENT_METHOD,
  ORDER_SHIPPING_ADDRESS
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    // ADD ITEMS TO CART
    case CART_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find(x => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? item: x)
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }


    // REMOVE ITEMS FROM CART
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload)
      }
    
    // save shipping address
    case ORDER_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload
      }
    
    // save order payment method
    case ORDER_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload
      }
    
    // clear order cart
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: []
      }

      default:
        return state
    }
}