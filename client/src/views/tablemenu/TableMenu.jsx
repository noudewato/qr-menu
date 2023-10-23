import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CContainer, CCol, CRow } from '@coreui/react'

import { CategoryGroupListAction } from '../../store/actions/categoryGroupAction'
import { CategoriesListAction } from '../../store/actions/categoryActions'
import CategoryButton from '../../components/categoryComponent/CategoryButton'
import { Grid } from '@mui/material'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { Loader } from '../../components/Loader'

const TableMenu = () => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true)
  const [categorySearch, setCategorySearch] = useState('')

  useEffect(() => {
    const setTimer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false)
      }
    }, 3500)

    return () => clearTimeout(setTimer)
  }, [isLoading])

  const categoryGroupList = useSelector((state) => state.categoryGroupList)
  const { categoryGroup, loading } = categoryGroupList

  const categoryList = useSelector((state) => state.categoryList)
  const { categories, loading: categoryLoading } = categoryList

  useEffect(() => {
    dispatch(CategoryGroupListAction())
  }, [dispatch])

  useEffect(() => {
    dispatch(CategoriesListAction())
  }, [dispatch])
  return (
    <div>
      <Navbar />
      <CContainer fluid style={{ minHeight: '80vh' }}>
        {isLoading || loading || categoryLoading ? (
          <Loader />
        ) : (
          <CContainer>
            <CRow className="mt-5">
              <CCol sm="12" md="6" lg="6" style={{ display: 'flex', alignItems: 'center' }}>
                {categoryGroup &&
                  categoryGroup.map((group) => (
                    <span
                      key={group._id}
                      style={{
                        padding: '.5rem 1rem',
                        marginBottom: '1.5rem',
                        marginRight: '.5rem',
                        cursor: 'pointer',
                        border: '.5px solid gray',
                        borderRadius: '8px',
                      }}
                      onClick={() => {
                        dispatch(CategoriesListAction(`${group.name}`))
                        //   setActive(group)
                      }}
                    >
                      {group.name}
                    </span>
                  ))}
              </CCol>
              <CCol sm="12" md="6" lg="6">
                <input
                  type="text"
                  style={{
                    width: '95%',
                    padding: '.5rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid gold',
                    boxShadow: '0 4px 8px rgb(237, 237,237)',
                    marginBottom: '1.5rem',
                  }}
                  placeholder="...type here"
                  onChange={(e) => setCategorySearch(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow style={{ marginTop: '2rem' }}>
              <Grid container spacing={2}>
                {categories &&
                  categories
                    .filter((category) => category.name.toLowerCase().includes(categorySearch))
                    .map((category) => (
                      <Grid item lg={4} md={6} sm={6} xs={12} key={category._id}>
                        <CategoryButton category={category} />
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

export default TableMenu
