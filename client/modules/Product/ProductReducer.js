/**
 * Created by slava on 25.09.16.
 */

import { ADD_PRODUCT, ADD_PRODUCTS, SET_SEARCH_QUERY } from './ProductActions';

const initialState = { data: [], searchQuery: ''};

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

    default:
      return state;
  }

};

export const getProducts = (state, name = '') => {
  name = name.trim()
  return name === '' ?
    state.products.data :
    state.products.data.filter(product =>  `${product.name} ${product.price}`.indexOf(name) > -1)
};

export const getProduct = (state, cuid) => state.products.data.filter(p => p.cuid === cuid)[0];

export default ProductReducer;
