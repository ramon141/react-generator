import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import routesPermissions from '../routes_permissions.json';
import { ROLE } from 'src/utils/auth';

const AppContent = () => {

  const hasPermission = (path) => {
    if (ROLE === "ADMIN") return true;

    if (!routesPermissions[path]) //Se a rota não tiver sido definida
      return true;

    if (routesPermissions[path].includes(ROLE)) //Se o usuário tem acesso
      return true

    return false;
  }

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && hasPermission(route.path) && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
