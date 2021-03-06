import callApi, { callApiForm } from '../../util/apiCaller';

export const ADD_PRODUCTS = 'ADD_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_GROUP_FILTER = 'SET_GROUP_FILTER';

export function addProducts(products) {
  return {
    type: ADD_PRODUCTS,
    products,
  };
}
export function addProduct(product) {

  return {
    type: ADD_PRODUCT,
    product,
  };
}

export function setSearchQuery(searchQuery) {
  return {
    type: SET_SEARCH_QUERY,
    searchQuery,
  };
}

export function setGroupFilter(groupFilters){
  return {
    type: SET_GROUP_FILTER,
    groupFilters,
  }
}

export function addProductRequest(form) {
  return (dispatch) => {
    return callApiForm('products', 'post', form).then(res => dispatch(addProduct(res.product)));
  };
}


export function fetchProducts() {
  return (dispatch) => {
    return callApi('products').then(res => {
      dispatch(addProducts(res.products));
    });
  };
}
