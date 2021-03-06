import { combineReducers } from 'redux'
import { RECEIVE_PRODUCTS, ADD_TO_CART } from '../constants/ActionTypes'
import * as types from '../constants/ActionTypes'

function products(state, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return Object.assign({}, state, {
        inventory: state.inventory - 1
      })
    default:
      return state
  }
}

function byId(state = {}, action) {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return Object.assign({},
        state,
        action.products.reduce((obj, product) => {
          obj[product.id] = product
          return obj
        }, {})
      )
    default:
      const { productId } = action
      if (productId) {
        return Object.assign({}, state, {
          [productId]: products(state[productId], action)
        })
      }
      return state
  }
}

function visibleIds(state = [], action) {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products.map(product => product.id)
    default:
      return state
  }
}

export function form(state = { product_details: [] }, action) {
  switch (action.type) {
    case types.GET_PRODUCTS_SHOW_FORM_SUCCESS:
      return Object.assign({}, action.data, { type: 'show' })
    case types.SUBMIT_PRODUCTS_FORM_SUCCESS:
      return state
    default:
      return state
  }
}

export default combineReducers({
  byId,
  visibleIds,
  form
})

export function getProduct(state, id) {
  return state.byId[id]
}

export function getVisibleProducts(state) {
  return state.visibleIds.map(id => getProduct(state, id))
}
