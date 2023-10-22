// import axios from "axios"
// import {CART_ADD_ITEM} from "../constants/cartConstants"

import {
  CART_ADD_ITEM,
  CART_DECREMENT_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'

export const addToCart = (item) => (dispatch, getState) => {
  // const { data } = await axios.get(
  //   `/api/products/${id}`
  // );

  const cartItem = {
    name: item.name,
    _id: item._id,
    category: item.category,
    price: item.price,
    description: item.description,
    image: item.image,
    qty: 1,
  }

  dispatch({
    type: CART_ADD_ITEM,
    payload: cartItem,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const reduceItemFromCart = (item) => (dispatch) => {
  dispatch({
    type: CART_DECREMENT_ITEM,
    payload: item,
  })
}

export const removeFromCart = (item) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: item,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveDeliverAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('deliverAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
