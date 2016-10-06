/**
 * Created by slava on 25.09.16.
 */

import { ADD_PRODUCT, ADD_PRODUCTS, SET_SEARCH_QUERY, SET_GROUP_FILTER } from './ProductActions';

const initialState = { data: [], searchQuery: '', groupFilters: []};

const ProductReducer = (state = initialState, action) => {

  switch (action.type) {
    case  ADD_PRODUCTS:
      return {
        ...state,
        data: action.products
      };

    case ADD_PRODUCT:
      return {
        ...state,
        data: [ action.product, ...state.data ]
      };

    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.searchQuery
      };

    case SET_GROUP_FILTER:
      return {
        ...state,
        groupFilters: action.groupFilters
      };

    default:
      return state;
  }

};

export const getProducts = (state, name = '', groupFilters = []) => {
  name = name.trim();

  var result = state.products.data;

  if (name !== '') {
    result = result.filter(product => `${product.name} ${product.price}`.indexOf(name) > -1);
  }

  if (groupFilters.length > 0)
  {
    result = result.filter(p => p.groups.every(item => groupFilters.indexOf(item) > -1));
  }

  return result;
};

export const getProduct = (state, cuid) => state.products.data.filter(p => p.cuid === cuid)[0];

export default ProductReducer;
