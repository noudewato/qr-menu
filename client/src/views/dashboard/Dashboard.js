import React, { useEffect } from 'react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { cilPeople } from '@coreui/icons'
import {
  CRow,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CContainer,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { GetOrderList } from '../../store/actions/orderActions'
import { UserListAction } from '../../store/actions/userActions'
import moment from 'moment'
import { Avatar } from '@mui/material'

const Dashboard = () => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { orders } = orderList

  const userList = useSelector((state) => state.userList)
  const { users } = userList

  useEffect(() => {
    dispatch(GetOrderList())
    dispatch(UserListAction())
  }, [dispatch])

  return (
    <>
      <WidgetsDropdown />

      <CContainer>
        <CRow>
          <CCol sm="6">
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>User</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {users &&
                  users.map((user) => (
                    <CTableRow v-for="item in tableItems" key={user._id}>
                      <CTableDataCell
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Avatar src={user.image} alt={user.username} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{user.fullName}</div>
                        <div className="small text-medium-emphasis">
                          <span>{user.isAdmin && 'Admin'}</span> | Joined:
                          {moment(user.createdAt).format(`Do MM YYYY`)}
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
          </CCol>
          <CCol style={{ padding: '1rem' }} sm="6">
            <CRow>
              <CCol style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Recent Order</CCol>
            </CRow>
            {orders &&
              orders.slice(0, 5).map((order) => (
                <CRow key={order._id}>
                  <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={order.username} alt={order.username} />
                    <div style={{ marginLeft: '1rem' }}>
                      <div>{order.username}</div>
                      <div className="small text-medium-emphasis" style={{ fontWeight: 'bold' }}>
                        <span>{order.tablePosition}</span>| {order.itemsPrice}
                        <span style={{ color: 'red', fontWeight: 'bold' }}>(GHC)</span>
                      </div>
                    </div>
                  </CCol>
                </CRow>
              ))}
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default Dashboard
