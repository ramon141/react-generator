import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { isAuthenticable, reloadInformations } from 'src/utils/auth'
import { Navigate } from 'react-router-dom'

//Todas essa rotas são privadas
const DefaultLayout = () => {

  useEffect(() => reloadInformations(), [])

  //Add auth

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
