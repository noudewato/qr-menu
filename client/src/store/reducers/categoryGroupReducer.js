import {
  CATEGORYGROUP_CREATE_FAILED,
  CATEGORYGROUP_CREATE_REQUEST,
  CATEGORYGROUP_CREATE_RESET,
  CATEGORYGROUP_CREATE_SUCCESS,
  CATEGORYGROUP_DELETE_FAILED,
  CATEGORYGROUP_DELETE_REQUEST,
  CATEGORYGROUP_DELETE_SUCCESS,
  CATEGORYGROUP_DETAILS_FAILED,
  CATEGORYGROUP_DETAILS_REQUEST,
  CATEGORYGROUP_DETAILS_SUCCESS,
  CATEGORYGROUP_LIST_FAILED,
  CATEGORYGROUP_LIST_REQUEST,
  CATEGORYGROUP_LIST_SUCCESS,
  CATEGORYGROUP_UPDATE_FAILED,
  CATEGORYGROUP_UPDATE_REQUEST,
  CATEGORYGROUP_UPDATE_RESET,
  CATEGORYGROUP_UPDATE_SUCCESS,
} from '../constants/categoryGroupConstant'

export const categoryGroupListReducer = (state = { categoryGroup: [] }, action) => {
  switch (action.type) {
    case CATEGORYGROUP_LIST_REQUEST:
      return { loading: true, categoryGroup: [] }
    case CATEGORYGROUP_LIST_SUCCESS:
      return {
        loading: false,
        categoryGroup: action.payload,
      }
    case CATEGORYGROUP_LIST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const categoryGroupDetailsReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORYGROUP_DETAILS_REQUEST:
      return { loading: true, ...state }
    case CATEGORYGROUP_DETAILS_SUCCESS:
      return { loading: false, category: action.payload }
    case CATEGORYGROUP_DETAILS_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const categoryGroupUpdateReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORYGROUP_UPDATE_REQUEST:
      return { loading: true }
    case CATEGORYGROUP_UPDATE_SUCCESS:
      return { loading: false, success: true, category: action.payload }
    case CATEGORYGROUP_UPDATE_FAILED:
      return { loading: false, error: action.payload }
    case CATEGORYGROUP_UPDATE_RESET:
      return { category: {} }
    default:
      return state
  }
}

export const categoryGroupCreateReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORYGROUP_CREATE_REQUEST:
      return { loading: true }
    case CATEGORYGROUP_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        category: action.payload,
      }
    case CATEGORYGROUP_CREATE_FAILED:
      return { loading: false, error: action.payload }
    case CATEGORYGROUP_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const categoryGroupDeleteReducer = (state = { categoryGroup: [] }, action) => {
  switch (action.type) {
    case CATEGORYGROUP_DELETE_REQUEST:
      return { loading: true }
    case CATEGORYGROUP_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case CATEGORYGROUP_DELETE_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
