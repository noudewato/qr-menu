import React from 'react'
import { NavLink } from 'react-router-dom'
import { CContainer, CHeader, CHeaderNav, CNavLink, CNavItem, CBadge } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCart, cilRestaurant, cilPhone } from '@coreui/icons'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  console.log(cartItems)

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderNav className="flex me-auto font-bold">
          <CNavItem>
            <CNavLink
              to="/menu"
              component={NavLink}
              style={{ fontWeight: 'bold', fontSize: '18px' }}
            >
              <CIcon icon={cilRestaurant} size="lg" style={{ color: 'gold' }} />
              TableMenu
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink to="/cart" component={NavLink} className="position-relative">
              <CIcon icon={cilCart} size="lg" style={{ fontWeight: 'bold', fontSize: '18px' }} />
              <CBadge
                className="border border-light p-1"
                color="danger"
                position="top-end"
                shape="rounded-circle"
              >
                {cartCount}
              </CBadge>
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="flex ms-auto">
          <CNavItem>
            <CNavLink component={NavLink} style={{ fontWeight: 'bold', fontSize: '18px' }}>
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
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default Navbar
