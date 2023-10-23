import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a
          href=""
          style={{
            textDecoration: 'none',
            cursor: 'pointer',
            color: 'white',
            padding: '5px',
            borderRadius: '7px',
            backgroundColor: 'gold',
          }}
        >
          Soft Pro
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
