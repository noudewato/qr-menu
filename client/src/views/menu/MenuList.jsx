import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CategoryDetailsAction } from '../../store/actions/categoryActions'
import { CContainer, CCol, CRow } from '@coreui/react'
import { Grid } from '@mui/material'
import MenuCard from './MenuCard'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { Loader } from 'src/components/Loader'

const MenuList = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const categoryDetails = useSelector((state) => state.categoryDetails)
  const { category, loading } = categoryDetails
  console.log(category)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const setTimer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false)
      }
    }, 3500)

    return () => clearTimeout(setTimer)
  }, [isLoading])

  useEffect(() => {
    dispatch(CategoryDetailsAction(id))
  }, [dispatch, id])

  const [query, setQuery] = useState('')

  return (
    <div className="Menu">
      <Navbar />

      <CContainer style={{ minHeight: '80vh' }}>
        {isLoading ? (
          <Loader />
        ) : (
          <CContainer>
            <CRow>
              <CCol
                style={{
                  margin: '3rem 0 1.5rem .5rem',
                  fontWeight: 'bold',
                  fontSize: '16px',
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
                  style={{
                    width: '95%',
                    padding: '.5rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid gold',
                    boxShadow: '0 4px 8px rgb(237, 237,237)',
                    marginBottom: '1.5rem',
                  }}
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
                        <div
                          style={{ fontSize: '18px', textTransform: 'lowercase', padding: '5px' }}
                        >
                          {product.description}
                        </div>
                      </div>
                    </Grid>
                  ))}
              </Grid>
            </CRow>
          </CContainer>
        )}
      </CContainer>
      <Footer />
    </div>
  )
}

export default MenuList
