import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../../components/navbar/Navbar'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { Toast } from 'primereact/toast'
import {
  Stack,
  Typography,
  Grid,
  TableHead,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Box,
  IconButton,
  Link,
  Button,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  clearCart,
  reduceItemFromCart,
  removeFromCart,
} from '../../store/actions/cartActions'
import { TableListAction } from '../../store/actions/tableActions'
import { addOrder } from '../../store/actions/orderActions'
import { CLEAR_CART } from '../../store/constants/cartConstants'
import { useNavigate } from 'react-router-dom'
import { ORDER_CREATE_RESET } from '../../store/constants/orderConstants'
import Footer from '../../components/footer/Footer'
import { Loader } from '../../components/Loader'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const createOrder = useSelector((state) => state.createOrder)
  const { loading, success, createdOrder, error } = createOrder

  const [username, setUsername] = useState('')
  const [tablePosition, setTablePositon] = useState('')
  const [user, setUser] = useState('')
  const [table, setTable] = useState('')
  const [orderItems, setOrderItems] = useState(cartItems)
  const [submitted, setSubmitted] = useState(false)
  const toast = useRef(null)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const setTimer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false)
      }
    }, 3500)

    return () => clearTimeout(setTimer)
  }, [isLoading])

  const tableList = useSelector((state) => state.tableList)
  const { tables } = tableList

  console.log(username, tablePosition)

  useEffect(() => {
    setOrderItems(cartItems)
    setUser(username)
    setTable(tablePosition)
  }, [cartItems, username, tablePosition])
  console.log(orderItems)
  const [countCartItem, setCountCartItem] = useState(0)
  useEffect(() => {
    const count = cartItems.reduce((acc, item) => acc + item.qty, 0)
    setCountCartItem(count)
  }, [cartItems])

  useEffect(() => {
    dispatch(TableListAction())
  }, [dispatch])

  useEffect(() => {
    if (success) {
      setUser('')
      setTable('')

      toast.current.show({
        severity: 'success',
        summary: 'successful',
        detail: `${createdOrder?.message}`,
        life: 3000,
      })
      dispatch(clearCart())
    }
  }, [createdOrder, success, dispatch])

  useEffect(() => {
    const setTimer = setTimeout(() => {
      if (success) {
        dispatch({
          type: ORDER_CREATE_RESET,
        })
        navigate('/menu')
      }
    }, 3200)
    return () => clearTimeout(setTimer)
  }, [dispatch, navigate, success])

  useEffect(() => {
    const setTimer = setTimeout(() => {
      if (error) {
        dispatch({
          type: ORDER_CREATE_RESET,
        })
      }
    }, 3200)
    return () => clearTimeout(setTimer)
  }, [dispatch, navigate, error])

  useEffect(() => {
    if (error) {
      setUser('')
      setTable('')
      toast.current.show({
        severity: 'error',
        summary: 'failed',
        detail: `${error}`,
        life: 3000,
      })
    }
  }, [error])

  const addRoundedNumber = (num) => Math.round(num * 100 + Number.EPSILON) / 100

  cartItems.itemsPrice = addRoundedNumber(
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0),
  )

  const itemsPrice = cartItems.itemsPrice

  console.log(itemsPrice)

  const placeOrder = (e) => {
    if (!username || !tablePosition) {
      setSubmitted(true)
    } else {
      e.preventDefault()
      dispatch(addOrder({ username: user, orderItems, itemsPrice, tablePosition: table }))
    }
  }

  return (
    <div>
      <Navbar />
      <Toast ref={toast} />
      <Stack sx={{ margin: '2rem', minHeight: '80vh' }}>
        {isLoading ? (
          <Loader />
        ) : cartItems?.length === 0 ? (
          <Grid>
            <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '10px', boxShadow: 2 }}>
              <Typography variant="h4">
                Your Cart is empty <Link href="/#/menu">Go back</Link>
              </Typography>
            </Box>
          </Grid>
        ) : (
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              // sx={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: 3 }}
            >
              <Box sx={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: 3 }}>
                <Stack direction="row" alignItems="center" sx={{ padding: '1rem' }}>
                  <Typography variant="h6">Cart</Typography>
                  <span style={{ color: 'lightgray' }}>({countCartItem} Items)</span>
                </Stack>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>TotalPrice</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((cartItem) => (
                        <TableRow key={cartItem._id}>
                          <TableCell component="th" scope="row" padding="2px">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <img
                                src={cartItem.image}
                                alt={cartItem.name}
                                style={{
                                  width: '200px',
                                  height: '100px',
                                  border: '2px solid grey',
                                  borderRadius: '1rem',
                                  objectFit: 'cover',
                                }}
                              />
                              <Typography variant="subtitle2" Wrap>
                                {cartItem.name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2" noWrap>
                              GHs{cartItem.price}
                            </Typography>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="2px">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <IconButton
                                onClick={() => {
                                  dispatch(addToCart(cartItem, cartItem.qty + 1))
                                }}
                              >
                                <ControlPointIcon />
                              </IconButton>

                              <Typography variant="subtitle2" noWrap>
                                {cartItem.qty}
                              </Typography>
                              <IconButton
                                onClick={() => dispatch(reduceItemFromCart(cartItem))}
                                disabled={cartItem.qty === 1}
                              >
                                <RemoveCircleOutlineIcon />
                              </IconButton>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2" noWrap>
                              GHs{cartItem.qty * cartItem.price}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Typography variant="subtitle2" noWrap>
                              <IconButton onClick={() => dispatch(removeFromCart(cartItem))}>
                                <DeleteOutlineIcon />
                              </IconButton>
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell rowSpan={4} />
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="center">
                          GHs
                          {cartItems &&
                            cartItems
                              .reduce((acc, item) => acc + item.qty * item.price, 0)
                              .toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Box
                component="form"
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  boxShadow: 3,
                  marginBottom: '1.5rem',
                }}
              >
                <Stack direction="row" alignItems="center" sx={{ padding: '1rem' }}>
                  <Typography variant="h6">Please fill the form</Typography>
                </Stack>

                <Stack sx={{ padding: '1rem' }}>
                  <div className="field mb-2">
                    <label htmlFor="name" className="font-bold mb-2" style={{ fontWeight: 'bold' }}>
                      Category Group
                    </label>
                    <br />
                    <select
                      value={tablePosition}
                      onChange={(e) => setTablePositon(e.target.value)}
                      style={{
                        padding: '1rem .5rem',
                        width: '100%',
                        border: `${
                          submitted && !tablePosition
                            ? '2px solid rgba(250, 101, 101, 0.947)'
                            : '2px solid #7873f5'
                        }`,
                        borderRadius: '6px',
                        outlineColor: 'ligthgrey',
                      }}
                    >
                      <option></option>
                      {tables &&
                        tables.map((table) => (
                          <option key={table._id} value={table.tablePosition}>
                            {table.tablePosition}
                          </option>
                        ))}
                    </select>
                    {submitted && !tablePosition && (
                      <small className="p-error">Table Position is required.</small>
                    )}
                  </div>
                  <div className="field">
                    <label htmlFor="name" className="font-bold mb-2" style={{ fontWeight: 'bold' }}>
                      Name
                    </label>
                    <br />
                    <input
                      style={{
                        padding: '1rem .5rem',
                        width: '100%',
                        border: `${
                          submitted && !username
                            ? '2px solid rgba(250, 101, 101, 0.947)'
                            : '2px solid #7873f5'
                        }`,
                        borderRadius: '6px',
                        outlineColor: 'ligthgrey',
                      }}
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      autoFocus
                      size={'lg'}
                      // className={classNames({ 'p-invalid': submitted && !username })}
                    />
                    {submitted && !username && <small className="p-error">Name is required.</small>}
                  </div>
                </Stack>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ color: 'white', backgroundColor: 'gold' }}
                  onClick={placeOrder}
                  disabled={!username || !tablePosition}
                >
                  {loading && <>.....</>} Place Order
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Stack>
      <Footer />
    </div>
  )
}

export default Cart
