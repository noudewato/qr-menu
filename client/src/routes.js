import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Tables = React.lazy(() => import('./views/restotables/RestoTables'))
const CategoryGroup = React.lazy(() => import('./views/categories/CategoryGroup'))
const Categories = React.lazy(() => import('./views/categories/Categories'))
const Products = React.lazy(() => import('./views/products/Products'))
const Users = React.lazy(() => import('./views/auth/Users'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/tables', name: 'tables', element: Tables },
  { path: '/categories', name: 'Categories', element: Categories },
  { path: '/categorygroup', name: 'Category Group', element: CategoryGroup },
  { path: '/products', name: 'Products', element: Products },
  { path: '/users', name: 'Users', element: Users },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
