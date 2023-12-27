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
import { useNavigate } from 'react-router-dom';
import { SubjectAPI } from 'src/api/Subject';
import Select from 'src/components/Select';
import SelectProfessor from 'src/components/SelectProfessor';


const classes = {
    center: { textAlign: 'center' }
}

const RegisterIndication = () => {
    const navigate = useNavigate();

    const [isVisibleModalReadEmenta, setIsVisibleModalReadEmenta] = useState(false);
    const [isVisibleModalReadObs, setIsVisibleModalReadObs] = useState(false);

    const [selectedProfessor1, setSelectedProfessor1] = useState(null);
    const [selectedProfessor2, setSelectedProfessor2] = useState(null);
    const [observation, setObservation] = useState();

    const [allInstitutes, setAllInstitutes] = useState([]);
    const [selectedInstitute, setSelectedInstitute] = useState(null);

    const [preOffersByInstitute, setPreOffersByInstitute] = useState({});
    const [selectedPreOffer, setSelectedPreOffer] = useState(null);

    const [ementa, setEmenta] = useState('');

    useEffect(() => {
        if (!!PERIOD_INDICATION) {
            PreOfferAPI.getIndication().then((response) => {
                const institutes = [];
                const preOffersByInstitute = {};

                response.data.forEach((preOffer) => {
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
            })
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            siape_professor: selectedProfessor1.value,
            siape_professor_2: selectedProfessor2?.value,
            observation,
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
                            <CCol md={12}>
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

                            <CCol md={8}>
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

                            {
                                !!selectedPreOffer && (
                                    <>
                                        <CCol md={2}>
                                            <div>
                                                <CFormLabel htmlFor="city">Ementa: </CFormLabel>
                                                <div style={{ textAlign: 'center' }}>
                                                    <CButton
                                                        onClick={() => setIsVisibleModalReadEmenta(true)}
                                                        style={{ width: '100%' }} // Ajuste a largura aqui
                                                        color="info"
                                                    >
                                                        <CIcon icon={cilSearch} style={{ '--ci-primary-color': 'white' }} />
                                                    </CButton>
                                                </div>
                                            </div>
                                        </CCol>

                                        <CCol md={2}>
                                            <CFormLabel htmlFor="city">Observação: </CFormLabel>
                                            <div style={{ textAlign: 'center' }}>
                                                <CButton
                                                    onClick={() => setIsVisibleModalReadObs(true)}
                                                    style={{ width: '100%' }} // Ajuste a largura aqui
                                                    color="info"
                                                >
                                                    <CIcon icon={cilInfo} style={{ '--ci-primary-color': 'white' }} />
                                                </CButton>
                                            </div>
                                        </CCol>
                                    </>
                                )
                            }

                            <CCol md={6}>
                                <SelectProfessor
                                    label="Docente"
                                    required={true}
                                    value={selectedProfessor1}
                                    setValue={setSelectedProfessor1}
                                    isDisabled={!selectedPreOffer}
                                />
                            </CCol>

                            <CCol md={6}>
                                <SelectProfessor
                                    label="Docente"
                                    required={false}
                                    value={selectedProfessor2}
                                    setValue={setSelectedProfessor2}
                                    isDisabled={!selectedPreOffer}
                                />
                            </CCol>

                            <CCol sm={12}>
                                <CFormLabel htmlFor="observation">Observação: </CFormLabel>
                                <CFormTextarea
                                    name="observation"
                                    type="text"
                                    id="observation"
                                    value={observation}
                                    onChange={(e) => setObservation(e.target.value)}
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
        </CRow >
    )
}

export default RegisterIndication;
