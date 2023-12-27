import { CAlert, CAlertHeading, CButton } from "@coreui/react";
import { useNavigate } from "react-router-dom";

export default function OutPeriod() {
  const navigate = useNavigate();

  return (
    <CAlert style={{ margin: 10 }} color="danger">
      <CAlertHeading tag="h4">Erro!</CAlertHeading>
      <p>
        O período de indicação NÃO está aberto!
      </p>
      <hr />
      <p className="mb-0">
        Utilize a área de cadastro para criar um novo período.
        <br />
        <CButton onClick={() => navigate('/period-register')} color="link" style={{ margin: 0, padding: 0 }}>
          Clique aqui para acessar a área de cadastro.
        </CButton>
      </p>
    </CAlert >
  )
}