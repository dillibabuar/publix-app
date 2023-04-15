//import { authHeader } from '../_helpers';

export const cartService = {
    addToCart,
    updateToCart,
    removeToCart,
    updateAddressToCart

};

function addToCart(product) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    };

    return fetch(`https://publix-api.herokuapp.com/api/cart/create`, requestOptions)
        .then(handleResponse)
        .then(cart => {
            localStorage.setItem('cart', JSON.stringify(cart));
            return cart;
        });
}

function updateToCart(product) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    };

    return fetch(`https://publix-api.herokuapp.com/api/cart/update`, requestOptions)
        .then(handleResponse)
        .then(cart => {
            localStorage.setItem('cart', JSON.stringify(cart));
            return cart;
        });
}

function removeToCart(product) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    };

    return fetch(`https://publix-api.herokuapp.com/api/cart/delete`, requestOptions)
        .then(handleResponse)
        .then(cart => {
            localStorage.setItem('cart', JSON.stringify(cart));
            return cart;
        });
}

function updateAddressToCart(address) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(address)
    };

    return fetch(`https://publix-api.herokuapp.com/api/cart/updateAddress`, requestOptions)
        .then(handleResponse)
        .then(cart => {
            localStorage.setItem('cart', JSON.stringify(cart));
            return cart;
        });
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            //    location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}