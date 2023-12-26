import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CRow,
} from '@coreui/react'

import Select from '../../../components/Select';

import 'react-datepicker/dist/react-datepicker.css';
import Asterix from 'src/components/Asterix';
import { toastPromisse } from 'src/utils/toast';
import { UserAPI } from 'src/api/User';
import { useNavigate } from 'react-router-dom';


const styles = {
    center: { textAlign: 'center' }
}


const NO_ERRORS_IN_FIELD = {
    name: { invalid: false, feedback: "" },
    email: { invalid: false, feedback: "" },
    password: { invalid: false, feedback: "" },
    role: { invalid: false, feedback: "" },
    institute: { invalid: false, feedback: "" },
}

const OPTIONS_ROLES = [
    { value: "DIAVE", label: 'DIAVE' },
    { value: "ADMIN", label: 'Admin' },
];

const RegisterUser = () => {
    const navigate = useNavigate();

    const [errorsField, setErrorsField] = useState(NO_ERRORS_IN_FIELD);
    const [role, setRole] = useState(null);

    const makeFormErrors = (err) => {
        const newErrorsField = structuredClone(NO_ERRORS_IN_FIELD);

        err.inner?.forEach(error => {
            newErrorsField[error.path] = { invalid: true, feedback: error.message }
        })

        setErrorsField(newErrorsField);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value,
            profile: e.target[4].value,

            institute: e.target[6].value,
        };

        setErrorsField(NO_ERRORS_IN_FIELD);

        toastPromisse(
            UserAPI.post(data),
            {
                pending: 'Cadastrando Usuário...',
                success: () => {
                    navigate('/user-list');
                    return 'Usuário cadastrado com sucesso!';
                },
                error: (data) => {
                    makeFormErrors(data);
                    const message = data.response?.data?.message;
                    return message || "O sistema apresentou um erro ao cadastrar o usuário";
                },
            }
        )

    }


    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Usuários</strong>
                        <br />
                        <small>Preencha os campos abaixo com as informações necessárias.
                            <br></br>
                            Após confirmar os dados, pressione o botão "Cadastrar".
                        </small>
                    </CCardHeader>
                    <CCardBody>
                        <p className="message-required">
                            Os campos marcados com asterisco (*) são obrigatórios.
                        </p>

                        <CForm className="row g-3" onSubmit={handleSubmit} >
                            <CCol md={6}>
                                <CFormLabel htmlFor="name">Nome <Asterix /></CFormLabel>
                                <CFormInput
                                    type="text"
                                    required
                                    {...errorsField.name}
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormLabel htmlFor="name">Email <Asterix /></CFormLabel>
                                <CFormInput
                                    type="email"
                                    required
                                    {...errorsField.email}
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormLabel htmlFor="name">Senha <Asterix /></CFormLabel>
                                <CFormInput
                                    type="password"
                                    required
                                    {...errorsField.password}
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormLabel htmlFor="city">Perfil <Asterix /></CFormLabel>
                                <Select
                                    required={true}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable
                                    placeholder="Selecione um perfil"
                                    name="role"
                                    defaultValue={null}
                                    onChange={setRole}
                                    value={role}
                                    options={OPTIONS_ROLES}
                                    isInvalid={errorsField.role.invalid}
                                />
                            </CCol>

                            <CCol style={styles.center}>
                                <CButton color="secondary" style={{ margin: 10, width: 100 }} onClick={() => navigate(-1)} >Voltar</CButton>
                                <CButton style={{ margin: 10, width: 100 }} type="submit">Cadastrar</CButton>
                            </CCol>

                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default RegisterUser;
