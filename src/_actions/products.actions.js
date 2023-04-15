import { productsConstants } from '../_constants';
import { productsService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const productsActions = {
    getAllProducts,
    getBestDeals,
    getKeywordSearch
};



function getAllProducts(subCat, categoryName) {
    
    return dispatch => {
        dispatch(request());

        productsService.getProductsBySubCat('soups')
            .then(
                products => { 
                    products.subcategoryName = subCat;
                    products.categoryName = categoryName;
                    dispatch(success(products));
                    history.push('/products');
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: productsConstants.PRODUCTS_GETALL_REQUEST} }
    function success(products) { return { type: productsConstants.PRODUCTS_GETALL_SUCCESS, products } }
    function failure(error) { return { type: productsConstants.PRODUCTS_GETALL_FAILURE, error } }
}

function getBestDeals() {
    
    return dispatch => {
        dispatch(request());

        productsService.getBestDealProducts()
            .then(
                products => { 
                    products.subcategoryName = 'Best Deals';
                    products.categoryName = 'Offers';
                    dispatch(success(products));
                   
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: productsConstants.PRODUCTS_BESTDEAL_REQUEST} }
    function success(products) { return { type: productsConstants.PRODUCTS_BESTDEAL_SUCCESS, products } }
    function failure(error) { return { type: productsConstants.PRODUCTS_BESTDEAL_FAILURE, error } }
}

function getKeywordSearch(keyword) {
    
    return dispatch => {
        dispatch(request());

        productsService.getKeywordSearch(keyword)
            .then(
                products => { 
                    products.subcategoryName = 'Search Keyword';
                    products.categoryName = 'Keyword';
                    dispatch(success(products));
                    history.push('/products');
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: productsConstants.PRODUCTS_GETALL_REQUEST} }
    function success(products) { return { type: productsConstants.PRODUCTS_GETALL_SUCCESS, products } }
    function failure(error) { return { type: productsConstants.PRODUCTS_GETALL_FAILURE, error } }
}


