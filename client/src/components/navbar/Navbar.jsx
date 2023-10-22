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
      <CContainer fluid className="px-5">
        <CHeaderNav className="flex me-auto font-bold">
          <CNavItem>
            <CNavLink to="/menu" component={NavLink}>
              <CIcon icon={cilRestaurant} size="lg" />
              TableMenu
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink to="/cart" component={NavLink} className="position-relative">
              <CIcon icon={cilCart} size="lg" />
              <CBadge
                className="border border-light p-2"
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
            <CNavLink component={NavLink}>
              <CIcon icon={cilPhone} size="lg" />
              +233550601470
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default Navbar
