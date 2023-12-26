from .utils import get_attrs
from classes.Model import Model

def page_list(model: Model):
    model_name = model.get_name()
    attrs = get_attrs(model)

    columns = ""
    for value in attrs:
        if value["name"] != "id":
            columns += """
            {
                header: '""" + value["name"].capitalize() + """',
                id: '""" + value["name"] +"""',
                accessorKey: '""" + value["name"] +"""'
            },
            """
    columns = "[" + columns + "\n\t\t]"

    list_var = model_name.lower()
    list_var_set = model_name.capitalize()


    html = """import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CModal,
    CModalBody,
    CModalFooter,
    CRow
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { """ + model_name + """API } from 'src/api/""" + model_name + """'
import Table from 'src/components/Table'


const List""" + model_name + """ = () => {

    const navigate = useNavigate();
    const [""" + list_var + """, set""" + list_var_set + """] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [""" + list_var + """ToDelete, set""" + list_var_set + """ToDelete] = useState(false);

    useEffect(() => {
        """ + model_name + """API.get().then((response) => {
            const data = response.data.sort((a, b) => {
                const profileOrder = { DIAVE: 1, DIRETOR: 2, COORDENADOR: 3, DOCENTE: 4, ADMIN: 5 };
                return profileOrder[a.profile] - profileOrder[b.profile];
            })
            set""" + list_var_set + """(data);
            setIsLoading(false);
        })
    }, []);

    const handleDelete = (""" + list_var + """) => {
        set""" + list_var_set + """((prev) => prev.filter((item) => item.id !== """ + list_var + """.id));
        set""" + list_var_set + """ToDelete(false);
        """ + model_name + """API.del(""" + list_var + """.id)
    }

    const handleEdit = (""" + list_var + """) => {
        navigate(`/""" + list_var + """-edit/${""" + list_var + """.id}`);
    }

    const modalDelete = () => (
        <CModal alignment="center" visible={!!""" + list_var + """ToDelete} onClose={() => set""" + list_var_set + """ToDelete(false)}>
            <CModalBody style={{ fontSize: 20, textAlign: 'center' }}>
                Você quer deletar o """ + model_name + """ {""" + list_var + """ToDelete?.name} ?
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => set""" + list_var_set + """ToDelete(false)}>
                    Fechar
                </CButton>

                <CButton color="danger" onClick={() => handleDelete(""" + list_var + """ToDelete)}>
                    Deletar
                </CButton>
            </CModalFooter>
        </CModal>
    )

    const columns = """ + columns + """

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Listagem de """ + model_name + """</strong>
                        <br />
                        <small>Aqui estão listadas todos(as) os(as) """ + model_name.lower() + """s cadastrados no sistema</small>
                    </CCardHeader>
                    <CCardBody>
                        <Table
                            columns={columns}
                            data={""" + list_var + """}
                            onDelete={set""" + list_var_set + """ToDelete}
                            onEdit={handleEdit}
                            canEdit={(e) => true}
                            canDelete={(e) => true}
                            state={{ isLoading }}
                        />
                    </CCardBody>
                </CCard>

                {modalDelete()}
            </CCol>
        </CRow>
    )
}

export default List""" + model_name + """;
    """

    return html