import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, NavLink } from 'react-router-dom'
// import Loader from '../Loader'
// import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { CategoryDetailsAction } from '../../store/actions/categoryActions'
// import './menu.css'
import { CContainer, CCol, CRow } from '@coreui/react'
import { Grid } from '@mui/material'
import MenuCard from './MenuCard'
import Navbar from '../../components/navbar/Navbar'

const MenuList = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const categoryDetails = useSelector((state) => state.categoryDetails)
  const { category, loading } = categoryDetails
  console.log(category)

  useEffect(() => {
    dispatch(CategoryDetailsAction(id))
  }, [dispatch, id])

  const [query, setQuery] = useState('')

  return (
    <div className="Menu">
      <Navbar />

      <CContainer fluid style={{ padding: '0px 150px 0px 150px' }}>
        <CRow>
          <CCol
            style={{
              margin: '3rem 0 1.5rem .5rem',
              fontWeight: 'bold',
              fontSize: '24px',
            }}
          >
            Click to place your order
          </CCol>
          <CCol
            style={{
              margin: '3rem 0 1.5rem',
            }}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search..."
              className="menu__search"
            />
          </CCol>
        </CRow>
        <CRow>
          <Grid container spacing={2}>
            {category?.products
              ?.filter((product) => product.name.toLowerCase().includes(query))
              .map((product) => (
                <Grid item lg={4} md={6} sm={12} xs={12} key={product._id}>
                  <div
                    style={{
                      border: '.5px solid black',
                      height: '350px',
                      borderRadius: '1rem',
                      boxShadow: '0px 4px 8px rgb(239, 239, 239)',
                      cursor: 'pointer',
                    }}
                  >
                    <MenuCard product={product} />
                    <div style={{ fontSize: '18px', textTransform: 'lowercase', padding: '5px' }}>
                      {product.description}
                    </div>
                  </div>
                </Grid>
              ))}
          </Grid>
        </CRow>
      </CContainer>
    </div>
  )
}

export default MenuList
