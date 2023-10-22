import axios from 'axios'
import {
  CATEGORYGROUP_CREATE_FAILED,
  CATEGORYGROUP_CREATE_REQUEST,
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
  CATEGORYGROUP_UPDATE_SUCCESS,
} from '../constants/categoryGroupConstant'

export const CategoryGroupListAction =
  (name = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CATEGORYGROUP_LIST_REQUEST,
      })

      // const {
      //   userLogin: { userInfo },
      // } = getState();

      // const config = {
      //   headers: {
      //     "content-type": "application/json",
      //     Authorization: `Bearer ${userInfo.token}`,
      //   },
      // };

      const { data } = await axios.get(`/api/category-group/?name=${name}`)

      dispatch({
        type: CATEGORYGROUP_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CATEGORYGROUP_LIST_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const CategoryGroupCreateAction = (categoryGroupData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORYGROUP_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/category-group/`, categoryGroupData, config)

    dispatch({
      type: CATEGORYGROUP_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CATEGORYGROUP_CREATE_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const CategoryGroupDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORYGROUP_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.delete(`/api/category-group/${id}`, config)

    dispatch({
      type: CATEGORYGROUP_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CATEGORYGROUP_DELETE_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const CategoryGroupUpdateAction = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORYGROUP_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/category-group/${category?._id}`, category, config)

    dispatch({
      type: CATEGORYGROUP_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CATEGORYGROUP_UPDATE_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
