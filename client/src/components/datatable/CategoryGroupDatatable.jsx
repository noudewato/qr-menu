import React, { useState, useEffect, useRef } from 'react'
import { classNames } from 'primereact/utils'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import {
  CategoryGroupCreateAction,
  CategoryGroupListAction,
  CategoryGroupDeleteAction,
  CategoryGroupUpdateAction,
} from '../../store/actions/categoryGroupAction'
import {
  CATEGORYGROUP_CREATE_RESET,
  CATEGORYGROUP_UPDATE_RESET,
} from '../../store/constants/categoryGroupConstant'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from '../spinner'

export default function CategoryGroupDatatable() {
  const dispatch = useDispatch()

  const categoryGroupList = useSelector((state) => state.categoryGroupList)
  const { loading: loadingList, categoryGroup } = categoryGroupList

  const categoryGroupCreate = useSelector((state) => state.categoryGroupCreate)
  const { loading, success, category, error } = categoryGroupCreate

  const categoryGroupDelete = useSelector((state) => state.categoryGroupDelete)
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = categoryGroupDelete

  const categoryGroupUpdate = useSelector((state) => state.categoryGroupUpdate)
  const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = categoryGroupUpdate

  useEffect(() => {
    dispatch(CategoryGroupListAction())
  }, [dispatch])

  let emptyCategoryGroup = {
    name: '',
  }

  const [categoryGroups, setCategoryGroups] = useState([])
  const [categoryGDialog, setCategoryGDialog] = useState(false)
  const [editDialog, setEditDialog] = useState(false)
  const [deleteCategoryGDialog, setDeleteCategoryGDialog] = useState(false)
  const [categoryG, setCategoryG] = useState(emptyCategoryGroup)
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [globalFilter, setGlobalFilter] = useState('')
  const toast = useRef(null)
  const dt = useRef(null)
  const [name, setName] = useState('')

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
    setCategoryGroups(categoryGroup)
  }, [categoryGroup])

  console.log(categoryGroups)

  const openNew = () => {
    setCategoryG(emptyCategoryGroup)
    setSubmitted(false)
    setCategoryGDialog(true)
  }

  const hideDialog = () => {
    setSubmitted(false)
    setCategoryGDialog(false)
    setEditDialog(false)
  }

  const hideDeleteProductDialog = () => {
    setDeleteCategoryGDialog(false)
  }

  const saveCategoryG = (e) => {
    if (categoryG.name !== '') {
      e.preventDefault()
      dispatch(
        CategoryGroupCreateAction({
          name: categoryG.name,
        }),
      )
    } else {
      setSubmitted(true)
    }
  }

  const saveEditCategoryG = (e) => {
    if (name !== '') {
      e.preventDefault()
      dispatch(
        CategoryGroupUpdateAction({
          _id: `${selectedCategoryGroup._id}`,
          name,
        }),
      )
    } else {
      setSubmitted(true)
    }
  }

  //category group create error
  useEffect(() => {
    if (error) {
      toast.current.show({
        severity: 'error',
        summary: 'error',
        detail: `${error}`,
        life: 3000,
      })

      dispatch({
        type: CATEGORYGROUP_CREATE_RESET,
      })
    }
  }, [error, dispatch])

  //category group update error
  useEffect(() => {
    if (errorUpdate) {
      toast.current.show({
        severity: 'error',
        summary: 'error',
        detail: `${error}`,
        life: 3000,
      })

      dispatch({
        type: CATEGORYGROUP_UPDATE_RESET,
      })
    }
  }, [errorUpdate, dispatch])

  //category group delete error
  useEffect(() => {
    if (errorDelete) {
      toast.current.show({
        severity: 'error',
        summary: 'error',
        detail: `${error}`,
        life: 3000,
      })
    }
  }, [errorDelete])

  //category group create success
  useEffect(() => {
    if (success) {
      categoryGroup.push(category)
      setCategoryGroups(categoryGroups)
      setCategoryG(emptyCategoryGroup)
      setCategoryGDialog(false)
      dispatch(CategoryGroupListAction())
      toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: 'Category Group Created',
        life: 3000,
      })

      dispatch({
        type: CATEGORYGROUP_CREATE_RESET,
      })
    }
  }, [success, emptyCategoryGroup, dispatch, categoryGroup])

  //category group update success
  useEffect(() => {
    if (successUpdate) {
      setSubmitted(false)
      setEditDialog(false)
      dispatch(CategoryGroupListAction())
      toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: 'Category Group Updated',
        life: 3000,
      })

      dispatch({
        type: CATEGORYGROUP_UPDATE_RESET,
      })
    }
  }, [successUpdate, dispatch])

  //category group delete success
  useEffect(() => {
    if (successDelete) {
      setSubmitted(false)
      setEditDialog(false)
      dispatch(CategoryGroupListAction())
      toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: 'Category Group Deleted',
        life: 3000,
      })

      // dispatch({
      //   type: CATEGORYGROUP_UPDATE_RESET,
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
    setSelectedCategoryGroup({ ...rowData })
    setEditDialog(true)
  }

  const confirmDeleteProduct = (rowData) => {
    setSelectedCategoryGroup(rowData)
    setDeleteCategoryGDialog(true)
  }

  const deleteProduct = () => {
    dispatch(CategoryGroupDeleteAction(selectedCategoryGroup?._id))
    setDeleteCategoryGDialog(false)
  }

  const exportCSV = () => {
    dt.current.exportCSV()
  }

  useEffect(() => {
    if (selectedCategoryGroup) {
      setName(selectedCategoryGroup?.name)
    }
  }, [selectedCategoryGroup])

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || ''
    let _categoryG = { ...categoryG }

    _categoryG[`${name}`] = val

    setCategoryG(_categoryG)
  }

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button label="New Category Group" icon="pi pi-plus" severity="success" onClick={openNew} />
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
      <h4 className="m-0">Manage Category Groups</h4>
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
      <Button onClick={saveEditCategoryG} className="mx-2 rounded">
        {loadingUpdate && <>...</>}Save
      </Button>
      <Button label="Cancel" outlined onClick={hideDialog} className="bg-red rounded " />
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
            value={categoryGroups}
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
              sortable
              style={{ minWidth: '12rem', fontWeight: '600' }}
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
        header="Edit Category Group"
        modal
        className="p-fluid"
        footer={editDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name" className="font-bold mb-2">
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
      </Dialog>

      <Dialog
        visible={categoryGDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Product Details"
        modal
        className="p-fluid"
        footer={categoryGDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name" className="font-bold mb-2">
            Name
          </label>
          <InputText
            id="name"
            value={categoryG?.name}
            onChange={(e) => onInputChange(e, 'name')}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !categoryG.name })}
          />
          {submitted && !categoryG.name && <small className="p-error">Name is required.</small>}
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
          {selectedCategoryGroup && (
            <span>
              Are you sure you want to delete <b>{selectedCategoryGroup?.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  )
}
