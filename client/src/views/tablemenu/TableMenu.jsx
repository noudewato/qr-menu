import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CContainer, CCol, CRow } from '@coreui/react'

import { CategoryGroupListAction } from '../../store/actions/categoryGroupAction'
import { CategoriesListAction } from '../../store/actions/categoryActions'
import CategoryButton from '../../components/categoryComponent/CategoryButton'
import { Grid } from '@mui/material'
import Navbar from '../../components/navbar/Navbar'

const TableMenu = () => {
  const dispatch = useDispatch()
  //   const [query, setQuery] = useState('')

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
      <CContainer fluid style={{ padding: '0px 150px 0px 150px' }}>
        <CRow className="mt-5">
          {categoryGroup &&
            categoryGroup.map((group) => (
              <CCol
                key={group._id}
                sm="auto"
                style={{
                  padding: '.5rem 1rem',
                  marginRight: '.5rem',
                  marginBottom: '3rem',
                  marginLeft: '1rem',
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
              </CCol>
            ))}
        </CRow>
        <CRow style={{ marginTop: '2rem' }}>
          <Grid container spacing={2}>
            {categories.map((category) => (
              <Grid item lg={4} md={6} sm={12} xs={12} key={category._id}>
                <CategoryButton category={category} />
              </Grid>
            ))}
          </Grid>
        </CRow>
      </CContainer>
    </div>
  )
}

export default TableMenu
