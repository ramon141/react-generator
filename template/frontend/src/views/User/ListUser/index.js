import React, { useEffect, useState } from 'react'
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
import { UserAPI } from 'src/api/User'
import Table from 'src/components/Table'


const ListUser = () => {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [userToDelete, setUserToDelete] = useState(false);

    useEffect(() => {
        UserAPI.get().then((response) => {
            const data = response.data.sort((a, b) => {
                const profileOrder = { DIAVE: 1, DIRETOR: 2, COORDENADOR: 3, DOCENTE: 4, ADMIN: 5 };
                return profileOrder[a.profile] - profileOrder[b.profile];
            })
            setUsers(data);
            setIsLoading(false);
        })
    }, []);

    const handleDelete = (user) => {
        // UserAPI.del(user.email);
        setUsers((prev) => prev.filter((item) => item.email !== user.email));
        setUserToDelete(false);
    }

    const handleEdit = (user) => {
        navigate(`/user-edit/${user.id}`);
    }

    const modalDelete = () => (
        <CModal alignment="center" visible={!!userToDelete} onClose={() => setUserToDelete(false)}>
            <CModalBody style={{ fontSize: 20, textAlign: 'center' }}>
                Você quer deletar o usuário {userToDelete.name} ({userToDelete.email}) ?
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => setUserToDelete(false)}>
                    Fechar
                </CButton>

                <CButton color="danger" onClick={() => handleDelete(userToDelete)}>
                    Deletar
                </CButton>
            </CModalFooter>
        </CModal>
    )

    const columns = [
        {
            header: 'Nome',
            id: 'name',
            accessorFn: (row) => row.name
        },
        {
            header: 'E-mail',
            id: 'email',
            accessorFn: (row) => row.email
        },
        {
            header: 'Perfil',
            id: 'profile',
            accessorFn: (row) => row.profile
        },
        {
            header: 'Unidade',
            id: 'isntitute',
            accessorFn: (row) => row.institute
        }
    ];

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Listagem de Usuários</strong>
                        <br />
                        <small>Aqui estão listadas todos os usuários cadastrados no sistema</small>
                    </CCardHeader>
                    <CCardBody>
                        <Table
                            columns={columns}
                            data={users}
                            onDelete={setUserToDelete}
                            onEdit={handleEdit}
                            canEdit={(e) => ["DIAVE", "DIRETOR"].includes(e.profile)}
                            canDelete={(e) => ["DIAVE", "DIRETOR"].includes(e.profile)}
                            state={{ isLoading }}
                        />
                    </CCardBody>
                </CCard>

                {modalDelete()}
            </CCol>
        </CRow>
    )
}

export default ListUser;
