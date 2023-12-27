import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CFormTextarea
} from '@coreui/react'

import 'react-datepicker/dist/react-datepicker.css';
import CIcon from '@coreui/icons-react';
import { cilSearch } from '@coreui/icons';
import { cilInfo } from '@coreui/icons';
import { ProfessorAPI } from 'src/api/Professor';
import { PreOfferAPI } from 'src/api/PreOffer';
import Asterix from 'src/components/Asterix';
import { IndicationAPI } from 'src/api/Indication';
import { toastError, toastPromisse } from 'src/utils/toast';
import { PERIOD_INDICATION } from 'src/utils/auth';
import OutPeriod from './OutPeriod';
import { useNavigate, useParams } from 'react-router-dom';
import { SubjectAPI } from 'src/api/Subject';
import Select from 'src/components/Select';


const classes = {
    center: { textAlign: 'center' }
}


const EditIndication = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [isVisibleModalReadEmenta, setIsVisibleModalReadEmenta] = useState(false);
    const [isVisibleModalReadObs, setIsVisibleModalReadObs] = useState(false);

    const [optionsProfessors, setOptionsProfessors] = useState([]);
    const [selectedProfessor, setSelectedProfessor] = useState(null);

    const [allInstitutes, setAllInstitutes] = useState([]);
    const [selectedInstitute, setSelectedInstitute] = useState(null);

    const [preOffersByInstitute, setPreOffersByInstitute] = useState({});
    const [selectedPreOffer, setSelectedPreOffer] = useState(null);

    const [ementa, setEmenta] = useState('');

    useEffect(() => {

        const loadPreOffers = (preOffers) => {
            const institutes = [];
            const preOffersByInstitute = {};

            preOffers.forEach((preOffer) => {
                const institute = preOffer.subject.departamento;
                if (institutes.filter(e => e.value === institute).length === 0)
                    institutes.push({ value: institute, label: institute });


                if (preOffersByInstitute[institute])
                    preOffersByInstitute[institute].push(preOffer);
                else
                    preOffersByInstitute[institute] = [preOffer];
            })

            setAllInstitutes(institutes);
            setPreOffersByInstitute(preOffersByInstitute);
        }


        const load = async () => {
            const { data: professors } = await ProfessorAPI.get();
            const { data: preOffers } = await PreOfferAPI.getIndication();

            setOptionsProfessors(professors.map((professor) => ({
                value: professor["siape"],
                label: professor["siape"] + " - " + professor["nome"]
            })));

            loadPreOffers(preOffers);

            const { data: indication } = await IndicationAPI.get(id);

            console.log(indication);

            // setObser

            // setSelectedProfessor(indication)

        }


        load();



        // if (!!PERIOD_INDICATION) {

        // }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            siape_professor: selectedProfessor.value,
            pre_offer_id: selectedPreOffer.id
        };

        toastPromisse(
            IndicationAPI.post(data),
            {
                pending: 'Cadastrando Indicação...',
                success: () => {
                    navigate('/indication-list');
                    return 'Indicação cadastrada com sucesso!';
                },
                error: "O sistema apresentou um erro ao cadastrar",
            }
        )

    }

    const modalReadEmenta = ({ setVisible, visible }) => {
        return (
            <>
                <CModal visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader onClose={() => setVisible(false)}>
                        <CModalTitle>Ementa - {selectedPreOffer?.subject?.nome}</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <p>
                            {ementa}
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

    const modalReadObs = ({ setVisible, visible }) => {
        return (
            <>
                <CModal visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader onClose={() => setVisible(false)}>
                        <CModalTitle>Observações - {selectedPreOffer?.subject?.nome}</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <p>
                            {selectedPreOffer?.observation}
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

    const handleChangeInstitute = (newValue, e) => {
        setSelectedInstitute(newValue);
    }

    const handleChangePreOffer = (newValue, e) => {
        setSelectedPreOffer(newValue);

        SubjectAPI.get(newValue.discipline_id)
            .then((response) => {
                setEmenta(response.data[0].ementa);
            })
            .catch((err) => {
                toastError('Erro ao carregar os dados da ementa');
            })
    }

    if (!PERIOD_INDICATION)
        return <OutPeriod />;

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Indicações</strong>
                        <br />
                        <small>
                            Escolha um Docente e uma Pré-Oferta para realizar uma indicação.
                            <br />
                            Verifique a Ementa antes de pressionar o botão "Cadastrar".
                            <br />
                            Cada campo de seleção permite a busca, basta começar a digitar.
                        </small>
                    </CCardHeader>
                    <CCardBody>
                        <p className="message-required">
                            Os campos marcados com asterisco (*) são obrigatórios.
                        </p>
                        <CForm className="row g-3" onSubmit={handleSubmit} >
                            <CCol md={6}>
                                <CFormLabel htmlFor="city">Unidade  <Asterix /></CFormLabel>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable
                                    name="institute"
                                    placeholder="Informe a Unidade"
                                    id="institute"
                                    required
                                    options={allInstitutes}
                                    value={selectedInstitute}
                                    onChange={handleChangeInstitute}
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormLabel htmlFor="city">Pré-Oferta <Asterix /></CFormLabel>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable
                                    name="turma"
                                    placeholder="Insira a pré-oferta"
                                    id="turma"
                                    required
                                    isDisabled={!preOffersByInstitute[selectedInstitute?.value]}
                                    value={selectedPreOffer}
                                    onChange={handleChangePreOffer}
                                    getOptionLabel={(option) => `${option.subject.nome} - TURMA: ${option.turma}`}
                                    getOptionValue={(option) => option.id}
                                    options={preOffersByInstitute[selectedInstitute?.value] || []}
                                />
                            </CCol>

                            <CCol md={9}>
                                <CFormLabel htmlFor="city">Docente <Asterix /></CFormLabel>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable
                                    name="subject"
                                    id="subject"
                                    isDisabled={!selectedPreOffer}
                                    required
                                    placeholder="Insira o docente"
                                    options={optionsProfessors}
                                    value={selectedProfessor}
                                    onChange={(newValue, e) => setSelectedProfessor(newValue)}
                                />
                            </CCol>

                            {
                                !!selectedPreOffer ?
                                    <CCol md={3} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ width: '45%' }}>
                                            <CFormLabel htmlFor="city">Ementa</CFormLabel>
                                            <br />
                                            <div style={{ textAlign: 'center' }}>
                                                <CButton
                                                    onClick={() => setIsVisibleModalReadEmenta(true)}
                                                    style={{ width: '100%' }}
                                                    color="info"
                                                >
                                                    <CIcon icon={cilSearch} style={{ '--ci-primary-color': 'white' }} />
                                                </CButton>
                                            </div>
                                        </div>

                                        <div style={{ width: '45%' }}>
                                            <CFormLabel htmlFor="city">Obs </CFormLabel>
                                            <br />
                                            <div style={{ textAlign: 'center' }}>
                                                <CButton
                                                    onClick={() => setIsVisibleModalReadObs(true)}
                                                    style={{ width: '100%' }}
                                                    color="info"
                                                >
                                                    <CIcon icon={cilInfo} style={{ '--ci-primary-color': 'white' }} />
                                                </CButton>
                                            </div>
                                        </div>
                                    </CCol> : false
                            }

                            <CCol sm={12}>
                                <CFormLabel htmlFor="observation">Observação: </CFormLabel>
                                <CFormTextarea
                                    name="observation"
                                    type="text"
                                    id="observation"
                                    rows={4}
                                />
                            </CCol>

                            <CCol style={classes.center} md={12}>
                                <CButton color="secondary" style={{ margin: 10, width: 100, color: 'white' }}>Voltar</CButton>
                                <CButton style={{ margin: 10, width: 100 }} type="submit">Cadastrar</CButton>
                            </CCol>

                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>

            {modalReadEmenta({ setVisible: setIsVisibleModalReadEmenta, visible: isVisibleModalReadEmenta })}
            {modalReadObs({ setVisible: setIsVisibleModalReadObs, visible: isVisibleModalReadObs })}
        </CRow>
    )
}

export default EditIndication;
