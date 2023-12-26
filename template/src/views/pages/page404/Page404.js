import React, { useEffect, useState } from 'react'
import {
  CCol,
  CContainer,
  CRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const [contador, setContador] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = contador > 0 ? setInterval(() => {
      setContador(contador - 1);
    }, 1000) : navigate('/');

    return () => clearInterval(timer);
  }, [contador, navigate]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-3">Ops! Você está perdido.</h4>
              <p>
                Estamos redirecionando você para a página principal em {contador}...
              </p>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
