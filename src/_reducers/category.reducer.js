import { categoryConstants } from '../_constants';

export function categories(state = {}, action) {
  switch (action.type) {
    case categoryConstants.GETALLCATEGORIES_REQUEST:
      return {
        loading: true
      };
    case categoryConstants.GETALLCATEGORIES_SUCCESS:
      return {
        items: action.users
      };
    case categoryConstants.GETALLCATEGORIES_FAILURE:
      return { 
        error: action.error
      };   
    
    default:
      return state
  }
}