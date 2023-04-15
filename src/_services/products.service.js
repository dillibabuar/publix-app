//import { authHeader } from '../_helpers';

export const productsService = {
    getAll,
    getById,
    getProductsBySubCat,
    getBestDealProducts,
    getKeywordSearch
};

function getAll() {
    const requestOptions = {
        method: 'GET',
      //  headers: authHeader()
    };

    return fetch(`https://publix-api.herokuapp.com/api/product`, requestOptions).then(handleResponse);
}

function getProductsBySubCat(subCatCode) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`https://publix-api.herokuapp.com/api/product/subCat/${subCatCode}`, requestOptions).then(handleResponse);
}

function getKeywordSearch(keyword) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`https://publix-api.herokuapp.com/api/product/keyWord/${keyword}`, requestOptions).then(handleResponse);
}

function getBestDealProducts() {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`https://publix-api.herokuapp.com/api/product/bestDeals/all`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
      //  headers: authHeader()
    };

    return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
              //  logout();
            //    location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}