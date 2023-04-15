import { categoryConstants } from '../_constants';
import { categoryService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const categoryActions = {
    getAllCategories
};



function getAllCategories() {
    return dispatch => {
        dispatch(request());

        categoryService.getAll()
            .then(
                categories => dispatch(success(categories)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: categoryConstants.GETALLCATEGORIES_REQUEST} }
    function success(users) { return { type: categoryConstants.GETALLCATEGORIES_SUCCESS, users } }
    function failure(error) { return { type: categoryConstants.GETALLCATEGORIES_FAILURE, error } }
}
