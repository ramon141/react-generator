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
    CRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { PERIOD_INDICATION, ROLE } from 'src/utils/auth'
import { IndicationAPI } from 'src/api/Indication'
import Table from 'src/components/Table'
import { PeriodAPI } from 'src/api/Period'
import { toastPromisse } from 'src/utils/toast'
import Select from 'src/components/Select'

const ListIndication = () => {

    const navigate = useNavigate();
    const [indications, setIndications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [period, setPeriod] = useState(null);
    const [allPeriods, setAllPeriods] = useState([]);

    const [indicationToDelete, setIndicationToDelete] = useState(false);

    const handleDelete = (indication) => {
        IndicationAPI.del(indication.id);
        setIndications((prev) => prev.filter((item) => item.id !== indication.id));
        setIndicationToDelete(false);
    }

    const handleEdit = (indication) => {
        navigate(`/indication-edit/${indication.id}`);
    }

    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            const { data: periods } = await PeriodAPI.get();
            const ordered = periods.sort((a, b) => moment(b.created_at).diff(a.created_at, 'milliseconds'));
            const data = ordered.map(item => ({
                value: item.id,
                label: item.name
            }));

            setAllPeriods(data);

            if (periods.length > 0)
                setPeriod(data[0])
            else setIsLoading(false);
        }

        load();
    }, [])

    useEffect(() => {
        if (period) {
            setIsLoading(true);
            const data = {
                complete: true,
                queryParams: { periods: [period.value] }
            };

            toastPromisse(
                IndicationAPI.get(data),
                {
                    pending: 'Carregando Dados',
                    success: (response) => {
                        const data = response.data.sort((a, b) => a.confirmed - b.confirmed);
                        setIndications(data);
                        setIsLoading(false);
                        return false;
                    },
                    error: (response) => {
                        return response.response?.data?.message || "Erro desconhecido"
                    },
                }
            )
        }
    }, [period])

    const modalDelete = () => (
        <CModal alignment="center" visible={!!indicationToDelete} onClose={() => setIndicationToDelete(false)}>
            <CModalBody style={{ fontSize: 20, textAlign: 'center' }}>
                Você quer deletar a indicação
                {" " + moment(indicationToDelete.start_request).format("DD/MM/YYYY")} até {moment(indicationToDelete.end_request).format("DD/MM/YYYY")} (pré-oferta) //TODO Alterar para pré-oferta?
                {", " + moment(indicationToDelete.start_indication).format("DD/MM/YYYY")} até {moment(indicationToDelete.end_indication).format("DD/MM/YYYY")} (indicação) ?
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => setIndicationToDelete(false)}>
                    Fechar
                </CButton>

                <CButton color="danger" onClick={() => handleDelete(indicationToDelete)}>
                    Deletar
                </CButton>
            </CModalFooter>
        </CModal>
    )

    const canDeleteAndUpdate = (ROLE === 'ADMIN' || ROLE === 'COORDENADOR') && PERIOD_INDICATION;

    const columns = [
        {
            header: 'Unidade',
            id: 'institute',
            accessorFn: (row) => row.pre_offers?.subject?.departamento || "Não Informado"
        },
        {
            header: 'Pré-Oferta',
            id: 'pre_offer',
            accessorFn: (row) => row.pre_offers?.subject?.nome || "Não Informado"
        },
        {
            header: 'Docente',
            id: 'professor',
            accessorFn: (row) => row.professor?.nome
        }
    ];

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Listagem de Indicações</strong>
                        <br />
                        <small>Aqui estão listadas todas as indicações. Para especificar um período, basta utilizar o campo de seleção abaixo.</small>
                    </CCardHeader>
                    <CCardBody>
                        <div style={{ marginBottom: 30 }}>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable
                                placeholder="Selecione uma Período"
                                name="period"
                                onChange={setPeriod}
                                value={period}
                                options={allPeriods}
                            />
                        </div>


                        <Table
                            columns={columns}
                            data={indications}
                            onDelete={setIndicationToDelete}
                            onEdit={handleEdit}
                            canEdit={(e) => !e.accepted && canDeleteAndUpdate}
                            canDelete={(e) => !e.accepted && canDeleteAndUpdate}
                            state={{ isLoading }}
                        />
                    </CCardBody>
                </CCard>

                {modalDelete()}
            </CCol>
        </CRow>
    )
}

export default ListIndication;
