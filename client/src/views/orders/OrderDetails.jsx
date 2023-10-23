import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  TableBody,
  Paper,
} from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import { ORDER_DETAILS_RESET } from '../../store/constants/orderConstants'
import { getOrderDetails } from '../../store/actions/orderActions'
import { Spinner } from '../../components/spinner'

const OrderDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading } = orderDetails

  useEffect(() => {
    dispatch(getOrderDetails(id))
  }, [id, dispatch])

  const completed = async () => {
    try {
      const res = await axios.put(`/api/orders/${id}`)
      if (res.status) {
        dispatch({
          type: ORDER_DETAILS_RESET,
        })
        setIsLoading(true)
        dispatch(getOrderDetails(id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const setTimmer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false)
      }
    }, 2500)

    return () => clearTimeout(setTimmer)
  }, [isLoading])

  return (
    <div>
      {loading || isLoading ? (
        <Spinner />
      ) : (
        <Container sx={{ marginBottom: '2rem' }}>
          <Stack direction="row" justifyContent="space-between" mb={3}>
            <Box>
              <Typography variant="h4" gutterBottom>
                Order #{order?._id.slice(0, 7)}
              </Typography>
              <Typography variant="p" component="div" gutterBottom>
                {moment(order?.createdAt).format('DD MMMM YYYY, hh:mm A')}
              </Typography>
              <Stack direction="row" alignItems="center">
                <Typography>Status</Typography>

                <div>
                  {order?.status === 0 ? (
                    <span
                      style={{
                        backgroundColor: 'red',
                        padding: '.5rem',
                        borderRadius: '5px',
                        color: 'white',
                      }}
                    >
                      Pending
                    </span>
                  ) : (
                    <span
                      style={{
                        backgroundColor: 'green',
                        padding: '.5rem',
                        borderRadius: '5px',
                        color: 'white',
                      }}
                    >
                      Completed
                    </span>
                  )}
                </div>
              </Stack>
            </Box>
            <Box>
              <Button
                variant="contained"
                disabled={order?.status === 1}
                color="success"
                sx={{ ml: 1 }}
                onClick={completed}
              >
                Completed
              </Button>
            </Box>
          </Stack>
          <Grid spacing={3} container>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                  color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                  boxShadow: 4,
                  borderRadius: 4,
                }}
              >
                <TableContainer component={Paper}>
                  <Table aria-label="spanning table">
                    <TableBody>
                      {order?.orderItems?.map((orderItem) => (
                        <TableRow key={orderItem._id}>
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <img
                                src={orderItem.image}
                                alt={orderItem.name}
                                style={{
                                  width: '80px',
                                  height: '80px',
                                  border: '3px solid grey',
                                  borderRadius: '1rem',
                                }}
                              />
                              <Typography variant="subtitle2" Wrap>
                                {orderItem.name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">x{orderItem.qty}</TableCell>
                          <TableCell align="center">
                            <Typography variant="subtitle2" noWrap>
                              {orderItem.price}(GHC)
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="subtitle2" noWrap>
                              {orderItem.price * orderItem.qty}(GHC)
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell rowSpan={4} />
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="center">
                          {order?.orderItems
                            ?.reduce((acc, orderItem) => acc + orderItem.qty * orderItem.price, 0)
                            .toFixed(2)}
                          (GHC)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                  color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                  boxShadow: 4,
                  borderRadius: 4,
                }}
              >
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{
                    mb: '.5rem',
                    mr: '1rem',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  Customer:
                  <Typography variant="h6" component="h6" noWrap>
                    {order?.username} <br />
                  </Typography>
                </Typography>

                <Typography
                  variant="h6"
                  component="h6"
                  sx={{
                    mb: '.5rem',
                    mr: '1rem',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  Table No:
                  <Typography variant="h6" component="h6" noWrap>
                    {(order?.tablePosition).slice(5, 7)} <br />
                  </Typography>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  )
}

export default OrderDetails
