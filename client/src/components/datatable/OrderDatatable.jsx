import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { GetOrderList } from '../../store/actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from '../spinner'
import { useNavigate } from 'react-router-dom'

export default function OrderDatatable() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const orderList = useSelector((state) => state.orderList)
  const { loading: loadingList, orders } = orderList

  useEffect(() => {
    dispatch(GetOrderList())
  }, [dispatch])

  const toast = useRef(null)
  const dt = useRef(null)

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

  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    let _filters = { ...filters }

    _filters['global'].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
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
          icon="pi pi-eye"
          rounded
          outlined
          className="mx-2 rounded "
          onClick={() => {
            navigate(`/orderDetails/${rowData._id}`)
          }}
        />
      </React.Fragment>
    )
  }

  const header = (
    <div
      className="flex flex-wrap gap-2 align-items-center justify-content-between"
      style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}
    >
      <h4 className="m-0">Manage Orders</h4>
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

  const priceBodyTemplate = (option) => {
    return (
      <div className="flex align-items-center gap-2">
        <span style={{ color: 'red' }}>GH</span>
        {option.itemsPrice}
      </div>
    )
  }

  const statusBodyTemplate = (option) => {
    return (
      <div>
        {option.status === 0 ? (
          <span
            style={{
              backgroundColor: 'red',
              padding: '.5rem',
              borderRadius: '5px',
              color: 'white',
            }}
          >
            Pending
          </span>
        ) : (
          <span
            style={{
              backgroundColor: 'green',
              padding: '.5rem',
              borderRadius: '5px',
              color: 'white',
            }}
          >
            Completed
          </span>
        )}
      </div>
    )
  }

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        {loadingList ? (
          <Spinner />
        ) : (
          <DataTable
            ref={dt}
            value={orders}
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
              field="tablePosition"
              header="Table"
              sortable
              style={{ minWidth: '10rem', fontWeight: '600' }}
            ></Column>
            <Column
              field="username"
              header="Name"
              sortable
              style={{ minWidth: '12rem', fontWeight: '600' }}
            ></Column>
            <Column
              field="itemsPrice"
              header="Total Price"
              body={priceBodyTemplate}
              sortable
              style={{ minWidth: '12rem', fontWeight: '600', textAlign: 'left' }}
            ></Column>
            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
              sortable
              style={{ minWidth: '10rem', fontWeight: '500' }}
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
    </div>
  )
}
