import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { classNames } from 'primereact/utils'
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
  Avatar,
  Box,
  IconButton,
  Link,
  Button,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, reduceItemFromCart, removeFromCart } from '../../store/actions/cartActions'
import { TableListAction } from '../../store/actions/tableActions'
import { InputText } from 'primereact/inputtext'

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const [username, setUsername] = useState('')
  const [tablePosition, setTablePositon] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const tableList = useSelector((state) => state.tableList)
  const { tables } = tableList

  const [countCartItem, setCountCartItem] = useState(0)
  useEffect(() => {
    const count = cartItems.reduce((acc, item) => acc + item.qty, 0)
    setCountCartItem(count)
  }, [cartItems])

  useEffect(() => {
    dispatch(TableListAction())
  }, [dispatch])

  const addRoundedNumber = (num) => Math.round(num * 100 + Number.EPSILON) / 100

  cartItems.itemsPrice = addRoundedNumber(
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0),
  )

  cartItems.taxPrice = addRoundedNumber(0.12 * cartItems.itemsPrice)

  cartItems.deliveryPrice =
    cartItems.itemsPrice > 100 ? addRoundedNumber(0.2 * cartItems.itemsPrice) : addRoundedNumber(0)

  cartItems.totalPrice = addRoundedNumber(cartItems.itemsPrice + cartItems.taxPrice)

  const orthers = [
    { name: 'SubTotal', price: cartItems.itemsPrice },
    { name: 'TaxPrice', price: cartItems.taxPrice },
    {
      name: 'DeliveryPrice',
      price: cartItems.deliveryPrice === 0 ? 'Free' : cartItems.deliveryPrice,
    },
  ]

  return (
    <div>
      <Navbar />
      <Stack sx={{ margin: '5rem' }}>
        {cartItems?.length === 0 ? (
          <Grid>
            <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '10px', boxShadow: 3 }}>
              <Typography variant="h6">
                Your Cart is empty <Link href="/menu">Go back</Link>
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
                              <Avatar alt={cartItem.name} src={cartItem.image} />
                              <Typography variant="subtitle2" noWrap>
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
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Box
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
                    </label>{' '}
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
                      id="name"
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
              </Box>

              <Button variant="contained" color="success" fullWidth sx={{ color: 'white' }}>
                Continue
              </Button>
            </Grid>
          </Grid>
        )}
      </Stack>
    </div>
  )
}

export default Cart
