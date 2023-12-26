import React from 'react';
import {
    CCard,
    CCardBody,
    CCardImage,
    CCardText,
    CCardTitle,
    CCol,
    CContainer,
    CRow,
    CButton,
    CLink
} from '@coreui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const TeamMemberCard = ({ name, role, expertise, github, linkedin, image }) => (
    <CCard style={{ width: '18rem' }}>
        <CCardImage orientation="top" src={image} />
        <CCardBody>
            <CCardTitle>{name}</CCardTitle>
            <CCardText>{role}</CCardText>
            <CCardText>{expertise}</CCardText>
            <CButton href={github} target="_blank" color="dark" variant="outline" className="me-2">
                <FaGithub /> GitHub
            </CButton>
            <CButton href={linkedin} target="_blank" color="dark" variant="outline">
                <FaLinkedin /> LinkedIn
            </CButton>
        </CCardBody>
    </CCard>
);

const OurTeam = () => {
    const teamMembers = [
        {
            name: 'Ramon Barbosa Pessoa',
            role: 'Bolsista',
            expertise: 'Desenvolvedor FullStack',
            github: 'https://github.com/ramon141',
            linkedin: 'https://br.linkedin.com/',
            image: 'https://computacao.enoque.net/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-22-at-08.37.38-150x150.jpeg'
        },
        {
            name: 'Lucas Heliab da Silva e Silva',
            role: 'Bolsista',
            expertise: 'Desenvolvedor Backend',
            github: 'https://github.com/LucasHeliab',
            linkedin: 'https://br.linkedin.com/',
            image: 'https://avatars.githubusercontent.com/u/102382365?v=4'
        },
        {
            name: 'Jheickson Felipe',
            role: 'Bolsista',
            expertise: 'Desenvolvedor Frontend',
            github: 'https://github.com/jheickson',
            linkedin: 'https://br.linkedin.com/',
            image: 'https://avatars.githubusercontent.com/u/102704500?v=4'
        },
        {
            name: 'Socorro Vânia',
            role: 'Coordenadora',
            github: 'https://github.com/vania',
            linkedin: 'https://br.linkedin.com/',
            image: 'https://computacao.enoque.net/wp-content/uploads/2022/08/fotovania-edited-1-150x150.jpg'
        },
        {
            name: 'Carla Marina',
            role: 'Coordenadora',
            github: 'https://github.com/carla',
            linkedin: 'https://br.linkedin.com/',
            image: 'https://computacao.enoque.net/wp-content/uploads/2022/08/servletrecuperafoto-3-edited-150x150.jpg'
        }
    ];

    return (
        <CContainer style={{ marginTop: 40 }} className="shadow-lg p-3 mb-5 bg-body rounded">
            <div className="mb-4" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }}>Nosso Time</div>
            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 4 }} >
                {teamMembers.map(member => (
                    <CCol key={member.name} md={6} lg={4} xl={3} className="d-flex align-items-stretch mb-4">
                        <TeamMemberCard {...member} />
                    </CCol>
                ))}
            </CRow>
            <div className="d-flex justify-content-end">
                <CLink href="/" className="mb-3">
                    Voltar para a página principal
                </CLink>
            </div>
        </CContainer>
    );
};

export default OurTeam;
