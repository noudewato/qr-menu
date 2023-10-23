import React, { useState, useEffect, useRef } from 'react'
import './datatable.css'
import { classNames } from 'primereact/utils'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import axios from 'axios'
import {
  CategoryCreateAction,
  CategoriesListAction,
  CategoryDeleteAction,
  CategoryUpdateAction,
} from '../../store/actions/categoryActions'
import { CategoryGroupListAction } from '../../store/actions/categoryGroupAction'
import {
  CATEGORY_CREATE_RESET,
  CATEGORY_UPDATE_RESET,
} from '../../store/constants/categoryConstant'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from '../spinner'
import { CProgress } from '@coreui/react'

export default function CategoryDatatable() {
  const dispatch = useDispatch()

  const categoryGroupList = useSelector((state) => state.categoryGroupList)
  const { categoryGroup } = categoryGroupList

  const categoryList = useSelector((state) => state.categoryList)
  const { loading: loadingList, categories: categoryData } = categoryList

  const categoryCreate = useSelector((state) => state.categoryCreate)
  const { loading, success, category, error } = categoryCreate

  const categoryDelete = useSelector((state) => state.categoryDelete)
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = categoryDelete

  const categoryUpdate = useSelector((state) => state.categoryUpdate)
  const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = categoryUpdate

  useEffect(() => {
    dispatch(CategoriesListAction())
  }, [dispatch])

  useEffect(() => {
    dispatch(CategoryGroupListAction())
  }, [dispatch])

  let emptyCategory = {
    name: '',
  }

  const [categories, setCategories] = useState([])
  const [categoryGDialog, setCategoryGDialog] = useState(false)
  const [editDialog, setEditDialog] = useState(false)
  const [deleteCategoryGDialog, setDeleteCategoryGDialog] = useState(false)
  const [categoryG, setCategoryG] = useState(emptyCategory)
  const [selectedCategory, setSelectedCategory] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [progress, setProgress] = useState(0)
  //   const [globalFilter, setGlobalFilter] = useState('')
  const toast = useRef(null)
  const dt = useRef(null)
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [selectedCategoryG, setSelectedCategoryG] = useState('')
  const [isActive, setIsActive] = useState(true)
  console.log(name)
  console.log(image)
  console.log(isActive)
  console.log(selectedCategoryG)

  const perset_key = 'myPreset'
  const cloud_name = 'dz88wbaks'

  const uploadImage = (e) => {
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('file', file)
    formData.append('upload_preset', perset_key)
    axios
      .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          setProgress(Math.round((100 * e.loaded) / e.total))
        },
      })
      .then((res) => setImage(res.data.secure_url))
      .catch((err) => console.log(err))
  }
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    _id: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.IN }],
    },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    'user.name': {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    createdAt: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
  })
  const [globalFilterValue, setGlobalFilterValue] = useState('')

  useEffect(() => {
    setCategories(categoryData)
  }, [categoryData])

  const openNew = () => {
    setCategoryG(emptyCategory)
    setSubmitted(false)
    setCategoryGDialog(true)
  }

  const hideDialog = () => {
    setSubmitted(false)
    setCategoryGDialog(false)
    setEditDialog(false)
    setSelectedCategory(null)
    setName('')
    setSelectedCategory('')
    setImage('')
  }

  const hideDeleteProductDialog = () => {
    setDeleteCategoryGDialog(false)
  }

  const saveCategoryG = (e) => {
    if (!name || !selectedCategoryG) {
      setSubmitted(true)
    } else {
      e.preventDefault()
      dispatch(
        CategoryCreateAction({
          name,
          categoryGroup: selectedCategoryG,
          image,
        }),
      )
    }
  }

  const saveEditCategoryG = (e) => {
    if (!name || !selectedCategoryG) {
      setSubmitted(true)
    } else {
      e.preventDefault()
      dispatch(
        CategoryUpdateAction({
          _id: `${selectedCategory._id}`,
          name,
          image,
          categoryGroup: selectedCategoryG,
          isActive,
        }),
      )
    }
  }

  //category  create error
  useEffect(() => {
    if (error) {
      toast.current.show({
        severity: 'error',
        summary: 'error',
        detail: `${error}`,
        life: 3000,
      })

      dispatch({
        type: CATEGORY_CREATE_RESET,
      })
    }
  }, [error, dispatch])

  //category  update error
  useEffect(() => {
    if (errorUpdate) {
      toast.current.show({
        severity: 'error',
        summary: 'error',
        detail: `${errorUpdate}`,
        life: 3000,
      })

      dispatch({
        type: CATEGORY_UPDATE_RESET,
      })
    }
  }, [errorUpdate, dispatch])

  //category  delete error
  useEffect(() => {
    if (errorDelete) {
      toast.current.show({
        severity: 'error',
        summary: 'error',
        detail: `${errorDelete}`,
        life: 3000,
      })
    }
  }, [errorDelete, dispatch])

  //category  create success
  useEffect(() => {
    if (success) {
      setCategories(categories)
      setCategoryGDialog(false)
      dispatch(CategoriesListAction())
      setName('')
      setSelectedCategoryG('')
      setImage('')
      setProgress(0)
      toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: 'Category Created',
        life: 3000,
      })

      // dispatch({
      //   type: CATEGORY_CREATE_RESET,
      // })
    }
  }, [success, dispatch, categories])

  //category  update success
  useEffect(() => {
    if (successUpdate) {
      setSubmitted(false)
      setEditDialog(false)
      setSelectedCategory(null)
      setName('')
      setImage('')
      setSelectedCategoryG('')
      setProgress(0)
      dispatch(CategoriesListAction())
      toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: 'Category  Updated',
        life: 3000,
      })

      dispatch({
        type: CATEGORY_UPDATE_RESET,
      })
    }
  }, [successUpdate, dispatch])

  //category  delete success
  useEffect(() => {
    if (successDelete) {
      setSubmitted(false)
      setEditDialog(false)
      dispatch(CategoriesListAction())
      toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: 'Category  Deleted',
        life: 3000,
      })

      // dispatch({
      //   type: CATEGORY_UPDATE_RESET,
      // })
    }
  }, [successDelete, dispatch])

  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    let _filters = { ...filters }

    _filters['global'].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const editCategoryG = (rowData) => {
    setSelectedCategory({ ...rowData })
    setEditDialog(true)
  }

  const confirmDeleteProduct = (rowData) => {
    setSelectedCategory(rowData)
    setDeleteCategoryGDialog(true)
  }

  const deleteProduct = () => {
    dispatch(CategoryDeleteAction(selectedCategory?._id))
    setDeleteCategoryGDialog(false)
  }

  const exportCSV = () => {
    dt.current.exportCSV()
  }

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory?.name)
      setImage(selectedCategory?.image)
      setSelectedCategoryG(selectedCategory?.categoryGroup)
    }
  }, [selectedCategory])
  console.log(selectedCategory)

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button label="New Category " icon="pi pi-plus" severity="success" onClick={openNew} />
      </div>
    )
  }

  const rightToolbarTemplate = () => {
    return (
      <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
    )
  }

  const formatDate = (value) => {
    return new Date(value).toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const createdAtBodyTemplate = (rowData) => {
    return formatDate(rowData.createdAt)
  }

  const idBodyTmplate = (rowData) => {
    return <div>{rowData._id.slice(0, 9)}</div>
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mx-2 rounded "
          onClick={() => editCategoryG(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          className=" rounded "
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    )
  }

  const header = (
    <div
      className="flex flex-wrap gap-2 align-items-center justify-content-between"
      style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}
    >
      <h4 className="m-0">Manage Category</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
        />
      </span>
    </div>
  )
  const categoryGDialogFooter = (
    <React.Fragment>
      <Button onClick={saveCategoryG} className="mx-2 rounded">
        {loading && <>...</>}Save
      </Button>
      <Button label="Cancel" outlined onClick={hideDialog} className="bg-red rounded " />
    </React.Fragment>
  )

  const editDialogFooter = (
    <React.Fragment>
      <Button onClick={saveEditCategoryG} className="m-2 rounded">
        {loadingUpdate && <>...</>}Save
      </Button>
      <Button label="Cancel" outlined onClick={hideDialog} className="bg-red rounded m-2" />
    </React.Fragment>
  )
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button severity="danger" onClick={deleteProduct} className="m-2 rounded">
        {loadingDelete && <>...</>}Yes
      </Button>
      <Button label="No" outlined onClick={hideDeleteProductDialog} className="m-2 rounded" />
    </React.Fragment>
  )

  const categoryNameItemTemplate = (option) => {
    return (
      <div className="flex align-items-center gap-2">
        <img alt={option.name} src={option.image} width="40" height="20" />
        <span>{option.name}</span>
      </div>
    )
  }

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

        {loadingList ? (
          <Spinner />
        ) : (
          <DataTable
            ref={dt}
            value={categories}
            filters={filters}
            columnResizeMode="expand"
            dataKey="_id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            header={header}
          >
            <Column
              field={'_id'}
              body={idBodyTmplate}
              header="Id"
              sortable
              style={{ minWidth: '10rem' }}
            ></Column>
            <Column
              field="name"
              header="Name"
              body={categoryNameItemTemplate}
              sortable
              style={{ minWidth: '12rem', fontWeight: '600' }}
            ></Column>

            <Column
              field="categoryGroup"
              header="Group"
              sortable
              style={{ minWidth: '12rem', fontWeight: '500' }}
            ></Column>

            <Column
              field={'user.username'}
              header="Created By"
              sortable
              style={{ minWidth: '10rem' }}
            ></Column>
            <Column
              field={'createdAt'}
              header="Created At"
              sortable
              filterField="date"
              dataType="date"
              style={{ minWidth: '12rem' }}
              body={createdAtBodyTemplate}
            ></Column>
            <Column
              header="Action"
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: '12rem' }}
            ></Column>
          </DataTable>
        )}
      </div>

      <Dialog
        visible={editDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Edit Category"
        modal
        className="p-fluid"
        footer={editDialogFooter}
        onHide={hideDialog}
      >
        <div className="field mb-2">
          <div
            style={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <label htmlFor="name" className="font-bold mb-2" style={{ fontWeight: 'bold' }}>
              Category Image
            </label>
            <div className="file-input">
              <input type="file" id="file" className="file" onChange={uploadImage} />
              <label htmlFor="file"> + Select file</label>
            </div>
          </div>
          <div>
            <img
              src={
                image
                  ? image
                  : 'https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0'
              }
              alt="image upload"
              className="block m-auto pb-3"
              width="100"
              height={'100'}
              style={{ objectFit: 'cover' }}
            />
            <div>
              <CProgress color="success" variant="striped" animated value={progress} />
            </div>
          </div>
        </div>
        <div className="field mb-2">
          <label htmlFor="name" className="font-bold mb-2" style={{ fontWeight: 'bold' }}>
            Category Group
          </label>{' '}
          <br />
          <select
            value={selectedCategoryG}
            onChange={(e) => setSelectedCategoryG(e.target.value)}
            style={{
              padding: '1rem .5rem',
              width: '100%',
              border: `${
                submitted && !selectedCategoryG
                  ? '2px solid rgba(250, 101, 101, 0.947)'
                  : '2px solid #7873f5'
              }`,
              borderRadius: '6px',
              outlineColor: 'ligthgrey',
            }}
          >
            <option></option>
            {categoryGroup &&
              categoryGroup.map((catG) => (
                <option key={catG._id} value={catG.name}>
                  {catG.name}
                </option>
              ))}
          </select>
          {submitted && !selectedCategoryG && (
            <small className="p-error">Category group is required.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="name" className="font-bold mb-2" style={{ fontWeight: 'bold' }}>
            Name
          </label>
          <InputText
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !name })}
          />
          {submitted && !name && <small className="p-error">Name is required.</small>}
        </div>

        <div className="field">
          <input type="checkbox" value={isActive} hidden />
        </div>
      </Dialog>

      <Dialog
        visible={categoryGDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="New Category"
        modal
        className="p-fluid"
        footer={categoryGDialogFooter}
        onHide={hideDialog}
      >
        <div className="field mb-2">
          <div
            style={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <label htmlFor="name" className="font-bold mb-2" style={{ fontWeight: 'bold' }}>
              Category Image
            </label>
            <div className="file-input">
              <input type="file" id="file" className="file" onChange={uploadImage} />
              <label htmlFor="file"> + Select file</label>
            </div>
          </div>
          <div>
            <img
              src={
                image
                  ? image
                  : 'https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0'
              }
              alt="image upload"
              className="block m-auto pb-3"
              width="100"
              height={'100'}
              style={{ objectFit: 'cover' }}
            />
            <div>
              <CProgress color="success" variant="striped" animated value={progress} />
            </div>
          </div>
        </div>
        <div className="field mb-2">
          <label htmlFor="name" className="font-bold mb-2" style={{ fontWeight: 'bold' }}>
            Category Group
          </label>
          <select
            value={selectedCategoryG}
            onChange={(e) => setSelectedCategoryG(e.target.value)}
            style={{
              padding: '1rem .5rem',
              width: '100%',
              border: `${
                submitted && !selectedCategoryG
                  ? '2px solid rgba(250, 101, 101, 0.947)'
                  : '2px solid #7873f5'
              }`,
              borderRadius: '6px',
              transition: 'background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s',
            }}
            className={classNames({ 'p-invalid': submitted && !selectedCategoryG })}
          >
            <option></option>
            {categoryGroup &&
              categoryGroup.map((catG) => (
                <option key={catG._id} value={catG.name}>
                  {catG.name}
                </option>
              ))}
          </select>
          {submitted && !selectedCategoryG && (
            <small className="p-error">Category group is required.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="name" className="font-bold mb-2" style={{ fontWeight: 'bold' }}>
            Name
          </label>
          <InputText
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !name })}
          />
          {submitted && !name && <small className="p-error">Name is required.</small>}
        </div>

        <div className="field">
          <input type="checkbox" value={isActive} hidden />
        </div>
      </Dialog>

      <Dialog
        visible={deleteCategoryGDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {selectedCategory && (
            <span>
              Are you sure you want to delete <b>{selectedCategory?.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  )
}
