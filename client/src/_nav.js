import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilBlurLinear,
  cilFastfood,
  cilUser,
  cilCart,
  cilHealing,
  cilRestaurant,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Tables',
    to: '/tables',
    icon: <CIcon icon={cilHealing} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Categories',
    to: 'categories',
    icon: <CIcon icon={cilBlurLinear} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Category Group',
        to: '/categorygroup',
      },
      {
        component: CNavItem,
        name: 'Category',
        to: '/categories',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Products',
    to: '/products',
    icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Orders',
    to: '/orders',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    badge: {
      color: 'danger',
      text: 'new Order',
    },
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Table Menu',
    to: '/menu',
    icon: <CIcon icon={cilRestaurant} customClassName="nav-icon" />,
  },
]

export default _nav
