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

  const capitalizeFirstLetter = (text) => {
    return text.trim().charAt(0).toUpperCase() + text.slice(1)
  }

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
                // sm="12"
                // md="6"
                // lg="6"
                style={{
                  margin: '.5rem 0 1.5rem .5rem',
                  fontWeight: 'bold',
                  fontSize: '22px',
                }}
              >
                Items found{' '}
                <span style={{ color: 'lightgray' }}>({category?.products?.length})</span>
              </CCol>
              <CCol
                // sm="12"
                // md="6"
                // lg="6"
                style={{
                  margin: '.5rem 0 1.5rem',
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
                {category.products
                  .filter((product) => product.name.toLowerCase().includes(query))
                  .map((product) => (
                    <Grid item lg={4} md={6} sm={6} xs={12} key={product._id}>
                      <div
                        style={{
                          position: 'relative',
                          border: '.5px solid lightgray',
                          height: '370px',
                          borderRadius: '1rem',
                          boxShadow: '0px 4px 8px rgb(239, 239, 239)',
                          cursor: 'pointer',
                        }}
                      >
                        <MenuCard product={product} />
                        <div style={{ fontSize: '20px', padding: '7px' }}>
                          {capitalizeFirstLetter(product.description)}
                        </div>
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            backgroundColor: 'rgb(255, 235, 120)',
                            padding: '8px',
                            width: '100%',
                            borderRadius: '1rem',
                            textAlign: 'center',
                            fontWeight: 'bold',
                          }}
                        >
                          {product.name}{' '}
                          <span
                            style={{
                              backgroundColor: 'red',
                              color: 'white',
                              fontWeight: 'bold',
                              padding: '.5rem',
                              borderRadius: '50%',
                            }}
                          >
                            <span>₵</span>
                            {product.price}
                          </span>
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
