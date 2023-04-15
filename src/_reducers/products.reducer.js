import { productsConstants } from '../_constants';

export function productList(state = {}, action) {
  
  switch (action.type) {
    
    case productsConstants.PRODUCTS_GETALL_REQUEST:
      return {
        loading: true
      };
    case productsConstants.PRODUCTS_GETALL_SUCCESS:
      return {
        products : action.products
      };
    case productsConstants.PRODUCTS_GETALL_FAILURE:
      return { 
        error: action.error
      }; 
      
    case productsConstants.PRODUCTS_BESTDEAL_REQUEST:
      return {
        loading: true
      };
    case productsConstants.PRODUCTS_BESTDEAL_SUCCESS:
      return {
        dealproducts : action.products
      };
    case productsConstants.PRODUCTS_BESTDEAL_FAILURE:
      return { 
        error: action.error
      };  
    
    default:
      return state
  }
}