//import { authHeader } from '../_helpers';

export const categoryService = {
    getAll,
    getById
};

function getAll() {
    const requestOptions = {
        method: 'GET',
      //  headers: authHeader()
    };

   // return fetch(`https://publixmart-api.herokuapp.com/api/category`, requestOptions).then(handleResponse);
    return fetch(`https://publix-api.herokuapp.com/api/category`, requestOptions).then(handleResponse);
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