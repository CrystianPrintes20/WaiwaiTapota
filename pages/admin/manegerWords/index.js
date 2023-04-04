import SidebarAdmin from "../../../src/components/sidebar";
import { Card, CardBody, Row, Col } from "reactstrap";
import { useEffect, useState } from "react";
import { SpinLoader } from "../../../src/components/loading";
import DataTableAdmin from "../../../src/components/admin/table/Mui_datatables";
import connectionWaiwai from "../../../src/services/waiwaiApi";

export default function ManegerWords({ token }) {
  const [isLoading, setIsLoading] = useState(false);
  const [dados, setDados] = useState(null);

  useEffect(() => {
    if (token) {
      const apiObj = new connectionWaiwai(token);
      setIsLoading(true)
      apiObj.palavrasMe().then((data) => {
        setDados(data);
      });
    }
  }, [token]);
  return (
    <SidebarAdmin>
      <Card>
        <CardBody>
          <Row className="justify-content-center mb-3">
            <Col md="7" className="text-center">
              <span className="label label-danger label-rounded">
               Gereciamento de palavras
              </span>
              <h2 className="title">Palavras cadastradas pelos usuários.</h2>
              <h6 className="subtitle">
                Encontre aqui todas as palavras cadastradas! Veja os
                detalhes, expressões, imagens, áudio e significados em um
                formato prático e fácil de usar.
              </h6>
            </Col>
          </Row>
          {isLoading && <SpinLoader />}
          <DataTableAdmin
            dados={dados}
            setIsLoading={setIsLoading}
            setDados={setDados}
            token={token}
            showAction
          />
        </CardBody>
      </Card>
    </SidebarAdmin>
  );
}

export async function getServerSideProps({ req, res }) {
  /**
   * Necessário signin para coletar o token válido, contrário retorna null
   */
  const accessToken = req.cookies.accessToken ? req.cookies.accessToken : null;
  return {
    props: { token: accessToken }, // will be passed to the page component as props
  };
}