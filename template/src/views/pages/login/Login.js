import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import logoImg from '../../../assets/brand/ufopa.png';
import { useNavigate } from 'react-router-dom';
import { UserAPI } from 'src/api/User';
import { login } from 'src/utils/auth';
import { toastError, toastPromisse } from 'src/utils/toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // Novo estado para controle de visibilidade da senha

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: e.target[0].value,
      password: e.target[1].value
    }

    if (!!data.email && !!data.password) {
      toastPromisse(
        promisseLogin(data),
        {
          pending: 'Autenticando...',
          success: (data) => {
            navigate('/dashboard');
          },
          error: (err) => {
            return err.response?.data?.message || "Credenciais inválidas"
          },
        }
      )
    } else {
      toastError('Preencha todos os campos');
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const promisseLogin = async (data) => {
    const response = await UserAPI.login(data);
    await login(response);
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm style={{ textAlign: 'center' }} onSubmit={handleLogin}>
                    <CImage src={logoImg} width={80} />
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Preencha algo aqui</p>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>

                      <CFormInput
                        placeholder="E-mail/Login"
                        name='email'
                        autoComplete="username"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>

                      <CFormInput
                        type={showPassword ? "text" : "password"}
                        name='password'
                        placeholder="Password"
                        autoComplete="current-password"
                      />

                      {/* Botão com ícone do react-icons */}
                      <CButton
                        color="light"
                        onClick={togglePasswordVisibility}
                        style={{
                          backgroundColor: 'var(--cui-input-group-addon-bg, #d8dbe0)',
                          border: '1px solid var(--cui-input-group-addon-border-color, #b1b7c1)'
                        }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Alterna entre ícones de olho aberto e fechado */}
                      </CButton>
                    </CInputGroup>

                    <CRow>
                      <CCol xs={12} className="mb-4">
                        <CButton color="primary" className="px-4" type='submit'>
                          Entrar
                        </CButton>
                      </CCol>

                      <CCol xs={12}>
                        <a href="/forget-password" onClick={(e) => { e.preventDefault(); navigate('/forget-password') }} target="_blank" rel="noopener noreferrer">
                          Esqueci minha senha
                        </a>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
