import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilCreditCard,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { NAME, logout, PICTURE, EMAIL } from 'src/utils/auth'
import { useNavigate } from 'react-router-dom'


const AppHeaderDropdown = () => {
  const url = PICTURE || `https://robohash.org/${EMAIL}`;
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(e.target.getAttribute('href'));
  }

  const exit = (e) => {
    e.preventDefault();
    logout();
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={url} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Bem-vindo {NAME}</CDropdownHeader>
        <CDropdownItem href="/profile" onClick={handleClick}>
          <CIcon icon={cilUser} className="me-2" />
          Perfil
        </CDropdownItem>
        <CDropdownItem href="/indication-list" onClick={handleClick}>
          <CIcon icon={cilSettings} className="me-2" />
          Minhas Indicações
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Confirmar Indicações
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="/" onClick={exit}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Sair
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
