import axios from 'axios'
import {
  TABLE_CREATE_FAILED,
  TABLE_CREATE_REQUEST,
  TABLE_CREATE_SUCCESS,
  TABLE_DELETE_FAILED,
  TABLE_DELETE_REQUEST,
  TABLE_DELETE_SUCCESS,
  TABLE_DETAILS_FAILED,
  TABLE_DETAILS_REQUEST,
  TABLE_DETAILS_SUCCESS,
  TABLE_LIST_FAILED,
  TABLE_LIST_REQUEST,
  TABLE_LIST_SUCCESS,
  TABLE_UPDATE_FAILED,
  TABLE_UPDATE_REQUEST,
  TABLE_UPDATE_SUCCESS,
} from '../constants/tableConstants'

export const TableListAction = () => async (dispatch) => {
  try {
    dispatch({
      type: TABLE_LIST_REQUEST,
    })

    const { data } = await axios.get(`/api/table/`)

    dispatch({
      type: TABLE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TABLE_LIST_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const TableCreateAction = (tableData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TABLE_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/table/`, tableData, config)

    dispatch({
      type: TABLE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TABLE_CREATE_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const TableDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TABLE_DELETE_REQUEST,
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

    const { data } = await axios.delete(`/api/table/${id}`, config)

    dispatch({
      type: TABLE_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TABLE_DELETE_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const TableUpdateAction = (table) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TABLE_UPDATE_REQUEST,
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

    const { data } = await axios.put(`/api/table/${table?._id}`, table, config)

    dispatch({
      type: TABLE_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TABLE_UPDATE_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
