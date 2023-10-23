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
import { Avatar } from 'primereact/avatar'
import {
  UserListAction,
  CreateUserAction,
  UpdateUserAction,
  DeleteUserAction,
} from '../../store/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from '../spinner'
import { InputSwitch } from 'primereact/inputswitch'
import {
  USER_REGISTER_RESET,
  USER_UPDATE_RESET,
  USER_DELETE_RESET,
} from '../../store/constants/userConstants'

export default function UserDatatable() {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading: loadingList, users } = userList

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, success, error } = userRegister

  const userDelete = useSelector((state) => state.userDelete)
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = userDelete

  const userUpdated = useSelector((state) => state.userUpdated)
  const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = userUpdated

  useEffect(() => {
    dispatch(UserListAction())
  }, [dispatch])

  const [categoryGDialog, setCategoryGDialog] = useState(false)
  const [editDialog, setEditDialog] = useState(false)
  const [deleteCategoryGDialog, setDeleteCategoryGDialog] = useState(false)
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const toast = useRef(null)
  const dt = useRef(null)
  const [fullName, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [phoneNumber, setPhonenumber] = useState('')
  const [isAdmin, setIsAdmin] = useState(true)

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

  const openNew = () => {
    setSubmitted(false)
    setCategoryGDialog(true)
  }

  const hideDialog = () => {
    setSubmitted(false)
    setCategoryGDialog(false)
    setSelectedCategoryGroup({})
    setEditDialog(false)
    setFullname('')
    setUsername('')
    setPhonenumber('')
    setIsAdmin('')
  }

  const hideDeleteProductDialog = () => {
    setDeleteCategoryGDialog(false)
  }

  const saveUser = (e) => {
    if (!username || !fullName || !phoneNumber) {
      setSubmitted(true)
    } else {
      e.preventDefault()
      dispatch(CreateUserAction({ fullName, username, password: '123456', phoneNumber, isAdmin }))
      setCategoryGDialog(false)
    }
  }

  const saveEditUser = (e) => {
    if (!username || !fullName || !phoneNumber) {
      setSubmitted(true)
    } else {
      e.preventDefault()
      dispatch(
        UpdateUserAction({
          _id: `${selectedCategoryGroup._id}`,
          fullName,
          username,
          phoneNumber,
          isAdmin,
        }),
      )
      setCategoryGDialog(false)
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
        type: USER_REGISTER_RESET,
      })
    }
  }, [error, dispatch])

  //category group update error
  useEffect(() => {
    if (errorUpdate) {
      toast.current.show({
        severity: 'error',
        summary: 'error',
        detail: `${errorUpdate}`,
        life: 3000,
      })

      dispatch({
        type: USER_UPDATE_RESET,
      })
    }
  }, [errorUpdate, dispatch])

  //category group delete error
  useEffect(() => {
    if (errorDelete) {
      toast.current.show({
        severity: 'error',
        summary: 'error',
        detail: `${errorDelete}`,
        life: 3000,
      })

      dispatch({
        type: USER_DELETE_RESET,
      })
    }
  }, [errorDelete, dispatch])

  //user group create success
  useEffect(() => {
    if (success) {
      setCategoryGDialog(false)
      dispatch(UserListAction())
      toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: 'User Created',
        life: 3000,
      })

      dispatch({
        type: USER_REGISTER_RESET,
      })
    }
  }, [success, dispatch])

  //user group update success
  useEffect(() => {
    if (successUpdate) {
      setSubmitted(false)
      setEditDialog(false)
      dispatch(UserListAction())
      toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: 'User Updated',
        life: 3000,
      })

      dispatch({
        type: USER_UPDATE_RESET,
      })
    }
  }, [successUpdate, dispatch])

  //category group delete success
  useEffect(() => {
    if (successDelete) {
      setSubmitted(false)
      setEditDialog(false)
      dispatch(UserListAction())
      toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: 'User Deleted',
        life: 3000,
      })

      dispatch({
        type: USER_DELETE_RESET,
      })
    }
  }, [successDelete, dispatch])

  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    let _filters = { ...filters }

    _filters['global'].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const editUser = (rowData) => {
    setSelectedCategoryGroup({ ...rowData })
    setEditDialog(true)
  }

  const confirmDeleteProduct = (rowData) => {
    setSelectedCategoryGroup(rowData)
    setDeleteCategoryGDialog(true)
  }

  const deleteProduct = () => {
    dispatch(DeleteUserAction(selectedCategoryGroup?._id))
    setDeleteCategoryGDialog(false)
  }

  const exportCSV = () => {
    dt.current.exportCSV()
  }

  useEffect(() => {
    if (selectedCategoryGroup) {
      setFullname(selectedCategoryGroup?.fullName)
      setUsername(selectedCategoryGroup?.username)
      setPhonenumber(selectedCategoryGroup?.phoneNumber)
      setIsAdmin(selectedCategoryGroup?.isAdmin)
    }
  }, [selectedCategoryGroup])

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button label="New User" icon="pi pi-plus" severity="success" onClick={openNew} />
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
          onClick={() => editUser(rowData)}
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
      <h4 className="m-0">Manage Users</h4>
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
      <Button onClick={saveUser} className="mx-2 rounded">
        {loading && <>...</>}Save
      </Button>
      <Button label="Cancel" outlined onClick={hideDialog} className="bg-red rounded " />
    </React.Fragment>
  )

  const editDialogFooter = (
    <React.Fragment>
      <Button onClick={saveEditUser} className="mx-2 rounded">
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

  const fullnameItemTemplate = (option) => {
    return (
      <div
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '3px' }}
      >
        <Avatar image={option.image} size="large" shape="circle" />
        <span>{option.username}</span>
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
            value={users}
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
              field="fullName"
              header="Name"
              sortable
              style={{ minWidth: '12rem', fontWeight: '600' }}
            ></Column>
            <Column
              field="username"
              header="Username"
              body={fullnameItemTemplate}
              sortable
              style={{ minWidth: '12rem', fontWeight: '600' }}
            ></Column>
            <Column
              field="phoneNumber"
              header="Phone"
              sortable
              style={{ minWidth: '12rem' }}
            ></Column>

            <Column field="isAdmin" header="Role" sortable style={{ minWidth: '12rem' }}></Column>
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
        header="Edit User"
        modal
        className="p-fluid"
        footer={editDialogFooter}
        onHide={hideDialog}
      >
        <div className="field mb-2">
          <label htmlFor="name" className="font-bold mb-2">
            FullName
          </label>
          <InputText
            id="fullname"
            value={fullName}
            onChange={(e) => setFullname(e.target.value)}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !fullName })}
          />
          {submitted && !fullName && <small className="p-error">fullName is required.</small>}
        </div>

        <div className="field mb-2">
          <label htmlFor="name" className="font-bold mb-2">
            Username
          </label>
          <InputText
            id="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !username })}
          />
          {submitted && !username && <small className="p-error">Username is required.</small>}
        </div>

        <div className="field mb-4">
          <label htmlFor="name" className="font-bold mb-2">
            Phone
          </label>
          <InputText
            id="fullname"
            value={phoneNumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !phoneNumber })}
          />
          {submitted && !phoneNumber && <small className="p-error">Phone is required.</small>}
        </div>

        <div
          className="field mt-2"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '2' }}
        >
          <InputSwitch checked={isAdmin} value={isAdmin} onChange={(e) => setIsAdmin(e.value)} />
          <label htmlFor="description" className="font-bold" style={{ marginLeft: '.3rem' }}>
            isActive?
          </label>
        </div>
      </Dialog>

      <Dialog
        visible={categoryGDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="New User"
        modal
        className="p-fluid"
        footer={categoryGDialogFooter}
        onHide={hideDialog}
      >
        <div className="field mb-2">
          <label htmlFor="name" className="font-bold mb-2">
            FullName
          </label>
          <InputText
            id="fullname"
            value={fullName}
            onChange={(e) => setFullname(e.target.value)}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !fullName })}
          />
          {submitted && !fullName && <small className="p-error">fullName is required.</small>}
        </div>

        <div className="field mb-2">
          <label htmlFor="name" className="font-bold mb-2">
            Username
          </label>
          <InputText
            id="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !username })}
          />
          {submitted && !username && <small className="p-error">Username is required.</small>}
        </div>

        <div className="field mb-4">
          <label htmlFor="name" className="font-bold mb-2">
            Phone
          </label>
          <InputText
            id="fullname"
            value={phoneNumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !phoneNumber })}
          />
          {submitted && !phoneNumber && <small className="p-error">Phone is required.</small>}
        </div>

        <div
          className="field mt-2"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '2' }}
        >
          <InputSwitch checked={isAdmin} value={isAdmin} onChange={(e) => setIsAdmin(e.value)} />
          <label htmlFor="description" className="font-bold" style={{ marginLeft: '.3rem' }}>
            isActive?
          </label>
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
