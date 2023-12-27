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
import { useNavigate } from 'react-router-dom';
import { UserAPI } from 'src/api/User';
import { toastPromisse } from 'src/utils/toast';

const ForgetPassword = () => {
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();

        const data = {
            email: e.target[0].value
        };

        toastPromisse(
            UserAPI.resetPassword(data),
            {
                pending: 'Enviando e-mail...',
                success: (response) => {
                    const dataResponse = response.data;
                    if (dataResponse.sigaa_user) {
                        alert("Foi identificado que você é um usuário do SIGAA, você deve trocar a senha no sistema SIG. Você será redirecionado para a página correta.")
                        window.open("https://sigadmin.ufopa.edu.br/admin/public/recuperar_senha.jsf");
                    } else {
                        navigate('/code-validate', { state: { email: data.email } });
                        return "E-mail enviado com sucesso! Consulte sua caixa de spam. Você tem 5 minutos para concluir a etapa de atualização de senha";
                    }

                },
                error: (err) => {
                    return err.response?.data?.message || "Falha ao enviar e-mail, tente novamente mais tarde";
                },
            },
            { autoClose: false }
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
                                        <h1>Recuperar Senha</h1>
                                        <p className="text-medium-emphasis">Informe seu E-mail ou Login</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput placeholder="E-mail/Login" name='email' autoComplete="username" />
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

export default ForgetPassword;
