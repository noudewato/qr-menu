// import React from 'react'
import { NavLink } from 'react-router-dom'
import { CContainer, CHeader, CHeaderNav, CNavLink, CNavItem, CBadge } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCart, cilRestaurant, cilPhone } from '@coreui/icons'
// import { useSelector } from 'react-redux'

// const Navbar = () => {
//   const cart = useSelector((state) => state.cart)
//   const { cartItems } = cart

//   console.log(cartItems)

//   const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0)

//   return (
//     <CHeader position="sticky" className="mb-4">
//       <CContainer fluid>
//         <CHeaderNav className="flex me-auto font-bold">
//           <CNavItem>
//             <CNavLink
//               to="/menu"
//               component={NavLink}
//               style={{ fontWeight: 'bold', fontSize: '18px' }}
//             >
//               <CIcon icon={cilRestaurant} size="lg" style={{ color: 'gold' }} />
//               TableMenu
//             </CNavLink>
//           </CNavItem>
//         </CHeaderNav>
//         <CHeaderNav>
//           <CNavItem>
//             <CNavLink to="/cart" component={NavLink} className="position-relative">
//               <CIcon icon={cilCart} size="lg" style={{ fontWeight: 'bold', fontSize: '18px' }} />
//               <CBadge
//                 className="border border-light p-1"
//                 color="danger"
//                 position="top-end"
//                 shape="rounded-circle"
//               >
//                 {cartCount}
//               </CBadge>
//             </CNavLink>
//           </CNavItem>
//         </CHeaderNav>
//         <CHeaderNav className="flex ms-auto">
//           <CNavItem>
//             <CNavLink component={NavLink} style={{ fontWeight: 'bold', fontSize: '18px' }}>
//               <CIcon
//                 icon={cilPhone}
//                 size="lg"
//                 style={{
//                   backgroundColor: 'gold',
//                   borderRadius: '50%',
//                   height: '20px',
//                   width: '20px',
//                   fontWeight: 'bold',
//                 }}
//               />
//               +233550601470
//             </CNavLink>
//           </CNavItem>
//         </CHeaderNav>
//       </CContainer>
//     </CHeader>
//   )
// }

// export default Navbar

import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Stack, Divider, Avatar } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const drawerWidth = 240
const navItems = ['Home', 'Shop', 'About', 'Contact']

function Navbar(props) {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  console.log(cartItems)

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const StyledAccount = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
  }))

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Stack direction="row">
          <Button>
            <Link
              style={{ color: 'black', listStyle: 'none', textDecoration: 'none' }}
              to={'/GroceryShop/home'}
            >
              <Stack direction="row">
                <Typography variant="h6" component="div">
                  Grocery
                </Typography>
                <Typography variant="h6" component="div" sx={{ color: 'green' }}>
                  Shop
                </Typography>
              </Stack>
            </Link>
          </Button>
        </Stack>
      </Box>

      <Divider />

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <StyledAccount>
          <Avatar src={userInfo?.user?.image} alt="photoURL" />

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              {userInfo?.user?.email}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {userInfo?.user?.email}
            </Typography>
          </Box>
        </StyledAccount>
      </Box>

      <List sx={{ display: 'none' }}>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <Link>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex', mb: '6rem', position: 'relative' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: 'white', color: 'black' }}>
        <Toolbar>
          <Box sx={{ display: { sm: 'block' }, ml: { xs: 0, sm: 0, lg: 5 } }}>
            <Link
              style={{ color: 'black', listStyle: 'none', textDecoration: 'none' }}
              to={'/GroceryShop/home'}
            >
              <Stack direction="row">
                <CIcon icon={cilRestaurant} size="lg" style={{ color: 'gold' }} />
                Table Menu
              </Stack>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <CNavLink to="/cart" component={NavLink} className="position-relative">
              <CIcon icon={cilCart} size="lg" style={{ fontWeight: 'bold', fontSize: '18px' }} />{' '}
              <CBadge
                className="border border-light p-1"
                color="danger"
                position="top-end"
                shape="rounded-circle"
              >
                {cartCount}
              </CBadge>
            </CNavLink>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: 'none', sm: 'block', md: 'block', lg: 'block' },
              mr: { xs: 0, sm: 0, lg: 5 },
            }}
          >
            <CIcon
              icon={cilPhone}
              size="lg"
              style={{
                backgroundColor: 'gold',
                borderRadius: '50%',
                height: '20px',
                width: '20px',
                fontWeight: 'bold',
              }}
            />
            +233550601470
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default Navbar
