import React from 'react';
import { CNavItem, CNavTitle, CNavGroup } from '@coreui/react'

import { FaChartBar } from 'react-icons/fa';
import routesPermissions from './routes_permissions.json';


const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <FaChartBar className="nav-icon" />,
    roles: routesPermissions['/all-users']
  },

  //end components
]

export default _nav
