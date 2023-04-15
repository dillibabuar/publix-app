import { cartConstants } from '../_constants';

let cartArr = JSON.parse(localStorage.getItem('cart'));
if(cartArr && cartArr.data){
  cartArr.cart = cartArr.data;
  delete cartArr.data;
}
const initialState = cartArr ? cartArr : {};

export function cartList(state = initialState, action) {
  switch (action.type) {
    case cartConstants.ADD_CART_REQUEST:
      return {
        cartloading: true
      };
    case cartConstants.ADD_CART_SUCCESS:
      return {
        cart: action.cart
      };
    case cartConstants.ADD_CART_FAILURE:
      return {
        error: action.error
      };



    case cartConstants.UPDATE_CART_REQUEST:
      return {
        cartloading: true
      };
    case cartConstants.UPDATE_CART_SUCCESS:
      return {
        cart: action.cart
      };
    case cartConstants.UPDATE_CART_FAILURE:
      return {
        error: action.error
      };



    case cartConstants.REMOVE_CART_REQUEST:
      return {
        cartloading: true
      };
    case cartConstants.REMOVE_CART_SUCCESS:
      return {
        cart: action.cart
      };
    case cartConstants.REMOVE_CART_FAILURE:
      return {
        error: action.error
      };


    case cartConstants.ADDRESS_CART_REQUEST:
        return {
          cartloading: true
        };
    case cartConstants.ADDRESS_CART_SUCCESS:
        return {
          cart: action.cart
        };
    case cartConstants.ADDRESS_CART_FAILURE:
        return {
          error: action.error
        };  

    default:
      return state
  }
}