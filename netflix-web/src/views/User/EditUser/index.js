import React, { useEffect, useState } from 'react'
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
import { useNavigate, useParams } from 'react-router-dom';


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

const INSTITUTES = [ //TODO Mudar para Unidade?
    { value: "IEG", label: 'Diretor da Unidade IEG' },
    { value: "ICED", label: 'Diretor da Unidade ICED' },
    { value: "Oriximiná", label: 'Diretor da Unidade Oriximiná' },
    { value: "Itaituba", label: 'Diretor da Unidade Itaituba' },
];

const EditUser = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [errorsField, setErrorsField] = useState(NO_ERRORS_IN_FIELD);
    const [role, setRole] = useState(null);
    const [user, setUser] = useState({});

    useEffect(() => {
        UserAPI.get(id).then((response) => {
            const role = OPTIONS_ROLES.filter(role => role.value == response.data.profile)[0];

            //Usuário a ser editado não está na lista de editáveis
            if (!role)
                navigate('/user-list');

            setRole(role);

            setUser({
                ...response.data,
                institute: INSTITUTES.filter(institute => institute.value == response.data.institute)[0]
            });
        });
    }, []);

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
            password: e.target[2].value || undefined,
            profile: role.value,
            institute: e.target[6].value,
        };

        setErrorsField(NO_ERRORS_IN_FIELD);

        toastPromisse(
            UserAPI.put(id, data),
            {
                pending: 'Atualizando Informações do Usuário...',
                success: () => {
                    navigate('/user-list');
                    return 'Informações atualizadas com sucesso!';
                },
                error: (data) => {
                    makeFormErrors(data);
                    const message = data.response?.data?.message;
                    return message || "O sistema apresentou um erro ao atualizar as informações";
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
                            Após confirmar os dados, pressione o botão "Atualizar".
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
                                    defaultValue={user.name}
                                    {...errorsField.name}
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormLabel htmlFor="name">Email <Asterix /></CFormLabel>
                                <CFormInput
                                    type="email"
                                    required
                                    defaultValue={user.email}
                                    {...errorsField.email}
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormLabel htmlFor="name">Senha</CFormLabel>
                                <CFormInput
                                    type="password"
                                    autoComplete="off"
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
                                    onChange={setRole}
                                    value={role}
                                    options={OPTIONS_ROLES}
                                    isInvalid={errorsField.role.invalid}
                                />
                            </CCol>

                            <CCol style={styles.center}>
                                <CButton color="secondary" onClick={() => navigate(-1)} style={{ margin: 10, width: 100 }}>Voltar</CButton>
                                <CButton style={{ margin: 10, width: 100 }} type="submit">Atualizar</CButton>
                            </CCol>

                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default EditUser;
