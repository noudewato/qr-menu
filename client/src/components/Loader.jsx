import React from 'react'
import { CSpinner } from '@coreui/react'
export const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '80vh',
      }}
    >
      <CSpinner color="warning" variant="grow" />
    </div>
  )
}
