import { cartConstants } from '../_constants';
import { cartService } from '../_services/';
import { history } from '../_helpers';

export const cartActions = {
    addToCart,
    updateToCart,
    removeToCart,
    updateAddressToCart

};

function addToCart(product) {
    return dispatch => {
        dispatch(request({ product }));

        cartService.addToCart(product)
            .then(
                cart => { 
                    dispatch(success(cart.data));                   
                },
                error => {
                    dispatch(failure(error));
                  
                }
            );
    };

    function request() { return { type: cartConstants.ADD_CART_REQUEST } }
    function success(cart) { return { type: cartConstants.ADD_CART_SUCCESS, cart } }
    function failure(error) { return { type: cartConstants.ADD_CART_FAILURE, error } }
}

function updateToCart(product) {
    return dispatch => {
        dispatch(request({ product }));

        cartService.updateToCart(product)
            .then(
                cart => { 
                    dispatch(success(cart.data));                   
                },
                error => {
                    dispatch(failure(error));
                  
                }
            );
    };

    function request() { return { type: cartConstants.UPDATE_CART_REQUEST } }
    function success(cart) { return { type: cartConstants.UPDATE_CART_SUCCESS, cart } }
    function failure(error) { return { type: cartConstants.UPDATE_CART_FAILURE, error } }
}

function removeToCart(product) {
    return dispatch => {
        dispatch(request({ product }));

        cartService.removeToCart(product)
            .then(
                cart => { 
                    dispatch(success(cart.data));                   
                },
                error => {
                    dispatch(failure(error));
                  
                }
            );
    };

    function request() { return { type: cartConstants.REMOVE_CART_REQUEST } }
    function success(cart) { return { type: cartConstants.REMOVE_CART_SUCCESS, cart } }
    function failure(error) { return { type: cartConstants.REMOVE_CART_FAILURE, error } }
}


function updateAddressToCart(address) {
    return dispatch => {
        dispatch(request({ address }));

        cartService.updateAddressToCart(address)
            .then(
                cart => { 
                    dispatch(success(cart.data)); 
                    //history.push('/');                  
                },
                error => {
                    dispatch(failure(error));
                  
                }
            );
    };

    function request() { return { type: cartConstants.ADDRESS_CART_REQUEST } }
    function success(cart) { return { type: cartConstants.ADDRESS_CART_SUCCESS, cart } }
    function failure(error) { return { type: cartConstants.ADDRESS_CART_FAILURE, error } }
}

