import React from 'react';
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
import { cilUser } from '@coreui/icons';
import logoImg from '../../../assets/brand/ufopa.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserAPI } from 'src/api/User';
import { toastPromisse } from 'src/utils/toast';

const CodeValidate = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const handleResetPassword = async (e) => {
        e.preventDefault();

        const data = {
            email,
            code: e.target[0].value
        };

        toastPromisse(
            UserAPI.validateCode(data),
            {
                pending: 'Validando Código...',
                success: (response) => {
                    setTimeout(() => navigate('/digit-password', { state: { token: response.data.token } }))
                    return "Código validado";
                },
                error: (err) => {
                    return err.response?.data?.message || "Erro desconhecido";
                },
            },
        )

    }

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm style={{ textAlign: 'center' }} onSubmit={handleResetPassword}>
                                        <CImage src={logoImg} width={80} />
                                        <h1>Validar Código</h1>

                                        <p className="text-medium-emphasis">Informe o código</p>

                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput type='number' placeholder="Código" name='code' autoComplete="username" />
                                        </CInputGroup>

                                        <CRow>
                                            <CCol xs={12} className="mb-4">
                                                <CButton color="primary" className="px-4" type='submit'>
                                                    Resetar senha
                                                </CButton>
                                            </CCol>

                                            <CCol xs={12}>
                                                <a href="/" onClick={(e) => { e.preventDefault(); navigate(-1) }} target="_blank" rel="noopener noreferrer">
                                                    Voltar
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

export default CodeValidate;
