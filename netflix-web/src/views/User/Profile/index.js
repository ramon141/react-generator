import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CFormLabel,
    CRow,
} from '@coreui/react'
import Asterix from 'src/components/Asterix';
import { UserAPI } from 'src/api/User';
import { toastPromisse } from 'src/utils/toast';
import { NAME, ROLE, reloadInformations, PICTURE, EMAIL } from 'src/utils/auth';
import { useNavigate } from 'react-router-dom';

const classes = {
    center: { textAlign: 'center' },
    imgCenter: {
        borderRadius: '50%',
        width: "80%",
        display: "flex",
        margin: "0 auto",
        position: "relative",
        WebkitTransform: "translateY(-50%)",
        MozTransform: "translateY(-50%)",
        transform: "translateY(-50%)",
        top: "50%"
    }
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
    { value: "DIRETOR", label: 'Diretor da Unidade' },
    { value: "ADMIN", label: 'Admin' },
    { value: "COORDENADOR", label: 'Coordenador' },
    { value: "DOCENTE", label: 'Docente' },
];

const Profile = () => {
    const navigate = useNavigate();

    const [errorsField, setErrorsField] = useState(NO_ERRORS_IN_FIELD);
    const [role, setRole] = useState(null);
    const [user, setUser] = useState({});

    useEffect(() => {
        UserAPI.me().then((response) => {
            const role = OPTIONS_ROLES.filter(role => role.value === response.data.profile)[0];

            setRole(role);

            setUser(response.data);
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
            profile: role.value
        };

        setErrorsField(NO_ERRORS_IN_FIELD);

        toastPromisse(
            UserAPI.putPersonal(user.id, data),
            {
                pending: 'Atualizando Informações do Usuário...',
                success: (data) => {
                    setTimeout(() => reloadInformations(), 1000);
                    return 'Informações atualizadas com sucesso!';
                },
                error: (data) => {
                    makeFormErrors(data);
                    console.log(data)
                    return "O sistema apresentou um erro ao atualizar as informações";
                },
            }
        )
    }

    const CAN_EDIT = ["ADMIN", "DIAVE"].includes(ROLE);

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={handleSubmit} >
                            <CCol md={3}>
                                <CFormLabel style={{ fontWeight: 'bold' }}>Foto de Perfil</CFormLabel>
                                <div style={{ height: '100%' }}>
                                    <img
                                        style={classes.imgCenter}
                                        src={PICTURE || `https://robohash.org/${EMAIL}`}
                                        alt="Foto de Usuário"
                                    />
                                </div>
                            </CCol>

                            <CCol md={9}>
                                <CContainer>
                                    <CRow>
                                        <CCol md={12}>
                                            <CFormLabel style={{ fontWeight: 'bold' }}>Informações Gerais</CFormLabel>
                                        </CCol>
                                    </CRow>

                                    <CRow md={{ gutterY: 3 }}>
                                        <CCol md={6}>
                                            <CFormLabel>Nome <Asterix /> </CFormLabel>
                                            <CFormInput
                                                required
                                                type="text"
                                                disabled={!CAN_EDIT}
                                                defaultValue={user.name}
                                                {...errorsField.name}
                                            />
                                        </CCol>
                                        <CCol md={6}>
                                            <CFormLabel>E-mail <Asterix /> </CFormLabel>
                                            <CFormInput
                                                required
                                                type="text"
                                                defaultValue={user.email}
                                                disabled={!CAN_EDIT}
                                                {...errorsField.email}
                                            />
                                        </CCol>

                                        {CAN_EDIT ? <CCol md={6}>
                                            <CFormLabel htmlFor="name">Senha</CFormLabel>
                                            <CFormInput
                                                type="password"
                                                autoComplete="off"
                                                disabled={!CAN_EDIT}
                                                {...errorsField.password}
                                            />
                                        </CCol> : false}


                                        <CCol md={CAN_EDIT ? 6 : 12}>
                                            <CFormLabel>Perfil <Asterix /> </CFormLabel>
                                            <CFormInput
                                                required
                                                type="text"
                                                defaultValue={role?.label}
                                                disabled
                                            />
                                        </CCol>

                                        {
                                            role?.value === "DIRETOR" ?
                                                <CCol md={12}>
                                                    <CFormLabel>Unidade <Asterix /> </CFormLabel>
                                                    <CFormInput
                                                        required
                                                        type="text"
                                                        defaultValue={user.unity_name}
                                                        disabled
                                                    />
                                                </CCol> : false
                                        }

                                        {
                                            role?.value === "COORDENADOR" ?
                                                <CCol md={12}>
                                                    <CFormLabel>Curso <Asterix /> </CFormLabel>
                                                    <CFormInput
                                                        required
                                                        type="text"
                                                        defaultValue={user.course}
                                                        disabled
                                                    />
                                                </CCol> : false
                                        }


                                    </CRow>
                                </CContainer>
                            </CCol>

                            <CCol style={{ ...classes.center, marginTop: 30 }}>
                                <CButton color="secondary" style={{ margin: 10, width: 100 }} onClick={() => navigate(-1)}>Voltar</CButton>
                                {
                                    CAN_EDIT ?
                                        <CButton style={{ margin: 10, width: 100 }} type="submit">Editar</CButton>
                                        :
                                        <CButton style={{ margin: 10, width: 150 }} onClick={(e) => {
                                            e.preventDefault();
                                            window.open("https://sigaa.ufopa.edu.br/sigaa/verTelaLogin.do");
                                        }} >Editar no SIGAA</CButton>
                                }
                            </CCol>



                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow >
    )
}

export default Profile;
