import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="http://www.ufopa.edu.br/ufopa/" target="_blank" rel="noopener noreferrer">
          UFOPA
        </a>
        <span className="ms-1">&copy;{(new Date()).getFullYear()} UFOPA.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Template por</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          CoreUI
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
