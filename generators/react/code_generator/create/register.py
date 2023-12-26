# Em react/register/register.py
from .utils import get_attrs
from classes.Model import Model

def create_page(model: Model):
    model_name = model.get_name()
    attrs = get_attrs(model)

    use_states = ""
    for value in attrs:
        if value["name"] != "id":
            use_states += "const [{}, set{}] = useState();\n".format(value["name"], value["name"].capitalize())

    data = ""
    for value in attrs:
        if value["name"] != "id":
            if value["type"] == "number":
                data += "{}: parseFloat({}), \n".format(value["name"], value["name"])
            else:
                data += "{}, \n".format(value["name"])

    fields = ""
    for value in attrs:
        if value["name"] != "id":
            fields += """
                <CCol md={6}>
                    <CFormLabel htmlFor=\"""" + value["name"] + """\">""" + value["name"] + ("<Asterix />" if value["required"] else "") + """</CFormLabel>
                    <CFormInput
                        type=\"""" + value["type"] + """\"
                        required={""" + str(value["required"]).lower() + """}
                        onChange={(e) => set""" + value["name"].capitalize() + """(e.target.value)}
                        value={""" + value["name"] + """}
                        {...errorsField.""" + value["name"] + """}
                    />
                </CCol>
            """


    html = """import React, { useState } from 'react'
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

import Select from '../components/Select';

import 'react-datepicker/dist/react-datepicker.css';
import Asterix from 'src/components/Asterix';
import { toastPromisse } from 'src/utils/toast';
import { """ + model_name.capitalize() + """API } from 'src/api/""" + model_name.capitalize() + """';
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

const Register""" + model_name.capitalize() + """ = () => {
    const navigate = useNavigate();

    const [errorsField, setErrorsField] = useState(NO_ERRORS_IN_FIELD);
    """ + use_states + """

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
            """ + data + """
        };

        setErrorsField(NO_ERRORS_IN_FIELD);

        toastPromisse(
            """ + model.get_name() + """API.post(data),
            {
                pending: 'Cadastrando """ + model_name.capitalize() + """...',
                success: () => {
                    navigate('/list-""" + model_name.lower() + """');
                    return '""" + model_name.capitalize() + """ cadastrado com sucesso!';
                },
                error: (data) => {
                    makeFormErrors(data);
                    const message = data.response?.data?.message;
                    return message || "O sistema apresentou um erro ao cadastrar o """ + model_name.capitalize() + """";
                },
            }
        )

    }


    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>""" + model_name.capitalize() + """</strong>
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
                            """ + fields + """

                            <CCol md={12} style={styles.center}>
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

export default Register""" + model_name.capitalize() + """;
    """

    return html