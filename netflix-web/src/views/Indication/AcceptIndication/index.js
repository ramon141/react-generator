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
    CModalHeader,
    CModalTitle,
    CRow,
} from '@coreui/react'
import { ROLE } from 'src/utils/auth'
import { IndicationAPI } from 'src/api/Indication'
import Table from 'src/components/Table'
import Select from 'src/components/Select'
import { PreOfferAPI } from 'src/api/PreOffer'
import { MdVerified } from 'react-icons/md';
import { IoIosInformationCircle } from "react-icons/io";
import { toastPromisse } from 'src/utils/toast'



const AcceptIndication = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [allPreOffers, setAllPreOffers] = useState([]);
    const [preOfferSelected, setPreOfferSelected] = useState(null);

    const [indications, setIndications] = useState([]);
    const [indicationToAccept, setIndicationToAccept] = useState(false);

    const [modalObsVisibilty, setModalObsVisibilty] = useState(false);
    const [selectedIndication, setSelectedIndication] = useState({});

    const [canAccept, setCanAccept] = useState(true);

    useEffect(() => {
        const data = {
            include: ['turma', 'subject']
        };

        PreOfferAPI.get(data).then((response) => {
            const data = response.data.map(i => ({
                value: i.id,
                label: `${i.subject.nome} - TURMA: ${i.turma}`
            }));

            const ordenedOptions = data.sort((a, b) => a.label.localeCompare(b.label));

            setAllPreOffers(ordenedOptions);
        });
    }, [])

    const handleAccept = (indication) => {
        toastPromisse(
            IndicationAPI.accept(indication.id),
            {
                pending: 'Aceitando Indicação...',
                success: () => {
                    const newIndications = indications.map((i) => {
                        if (i.id === indication.id)
                            return { ...indication, accepted: true };
                        return indication;
                    })

                    setCanAccept(false);
                    setIndications(newIndications);
                    return 'Indicação Aceita';
                },
                error: (response) => {
                    return response.response?.data?.message || "Erro desconhecido"
                },
            }
        )

        setIndicationToAccept(false);
    }

    const handleChangePreOfferSelected = (newValue, e) => {
        setPreOfferSelected(newValue);
        setIsLoading(true);

        IndicationAPI.get({ complete: true, queryParams: { pre_offers: [newValue.value] } })
            .then((response) => {
                const quantIndicationAccepted = response.data.filter((i) => i.accepted);

                setCanAccept(quantIndicationAccepted.length === 0);
                setIsLoading(false);
                setIndications(response.data);
            });
    }

    const modalDelete = () => (
        <CModal alignment="center" visible={!!indicationToAccept} onClose={() => setIndicationToAccept(false)}>
            <CModalBody style={{ fontSize: 20, textAlign: 'center' }}>
                Você deseja aceitar a indicação do docente {indicationToAccept.professor?.nome}
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" style={{ color: 'white' }} onClick={() => setIndicationToAccept(false)}>
                    Fechar
                </CButton>

                <CButton color="success" style={{ color: 'white' }} onClick={() => handleAccept(indicationToAccept)}>
                    Aceitar
                </CButton>
            </CModalFooter>
        </CModal>
    )

    const canDeleteAndUpdate = ROLE === 'ADMIN' || ROLE === 'COORDENADOR';
    const canConfirm = canDeleteAndUpdate && canAccept;

    const columns = [
        {
            header: 'Docente',
            id: 'docente',
            accessorFn: (row) => row.professor?.name
        },
        {
            header: 'Pré-Oferta',
            id: 'pre_offer',
            accessorFn: (row) => row.pre_offers?.name
        },
        {
            header: 'Unidade',
            id: 'institute',
            accessorFn: (row) => row.professor?.unidade
        }
    ];

    const handleShowObs = (indication) => {
        setSelectedIndication(indication);
        setModalObsVisibilty(true);
    }

    const arrayLater = [
        {
            header: 'Obs',
            id: 'obs',
            size: 60,
            enableColumnActions: false,
            enableColumnOrdering: false,
            muiTableBodyCellProps: {
                align: 'center',
            },
            accessorFn: (row) =>
                <div onClick={() => handleShowObs(row)} style={{ color: 'white', cursor: 'pointer' }}> <IoIosInformationCircle size={25} color='#47a3ff' /></div>
        },
        {
            header: 'Aceitar',
            id: 'accept',
            size: 90,
            enableColumnActions: false,
            enableColumnOrdering: false,
            muiTableBodyCellProps: {
                align: 'center',
            },
            accessorFn: (row) =>
                row.accepted ? <span>Aceito</span> :
                    canConfirm ? <div onClick={() => setIndicationToAccept(row)} style={{ color: 'white', cursor: 'pointer' }}> <MdVerified size={25} color='#32ba7c' /></div> :
                        false
        }
    ]

    const modalReadObs = ({ setVisible, visible }) => {
        return (
            <>
                <CModal visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader onClose={() => setVisible(false)}>
                        <CModalTitle>Observações - {selectedIndication?.pre_offers?.subject?.nome}</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <p>
                            {selectedIndication?.observation || "Não há observações"}
                        </p>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisible(false)}>
                            Fechar
                        </CButton>
                    </CModalFooter>
                </CModal>
            </>
        )
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Aceitar Indicações</strong>
                        <br />
                        <small>Selecione uma Pré-Oferta e consulte as indicações para esta</small>
                    </CCardHeader>
                    <CCardBody>
                        <div style={{ marginBottom: 30 }}>
                            <Select
                                required={true}
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable
                                placeholder="Selecione uma Pré-Oferta"
                                name="pre_offer"
                                onChange={handleChangePreOfferSelected}
                                value={preOfferSelected}
                                options={allPreOffers}
                            />
                        </div>

                        {
                            preOfferSelected ?
                                <Table
                                    columns={columns}
                                    data={indications}
                                    arrayLater={arrayLater}
                                    state={{ isLoading }}
                                />
                                :
                                false
                        }

                    </CCardBody>
                </CCard>

                {modalDelete()}
                {modalReadObs({ setVisible: setModalObsVisibilty, visible: modalObsVisibilty })}
            </CCol>
        </CRow>
    )
}

export default AcceptIndication;
