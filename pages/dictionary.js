import { useEffect, useState } from "react";
import Layout from "../src/layout/Layout";
import Banner3 from "../src/components/banner/Banner3";
import Banner from "../src/components/banner/Banner";
import { Card, CardBody, Row, Col } from "reactstrap";
import { useSession } from "next-auth/react";
import DataTable from "../src/components/table/Mui_datatables";
import connectionWaiwai from "../src/services/waiwaiApi";
import { SpinLoader } from "../src/components/loading";

export default function Dictionary({ token }) {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession();
  const [dados, setDados] = useState(null);

  useEffect(() => {
    if (token) {
      const apiObj = new connectionWaiwai(token);
      setIsLoading(true)
      apiObj.allPalavras().then((data) => {
        setDados(data);
      });
    }
  }, [token]);

  if (session) {
    return (
      <Layout>
        <Banner3/>
        <Card>
          <CardBody>
            <Row className="justify-content-center mb-3">
              <Col md="7" className="text-center">
                <span className="label label-danger label-rounded">
                  Tela de Dicionario
                </span>
                <h2 className="title">Está procurando alguma palavra?</h2>
                <h6 className="subtitle">
                  Seja bem-vindo ao nosso dicionário online! Aqui você
                  encontrará uma lista de palavras, frases, expressões e termos
                  usados na língua materna Waiwai. Nosso objetivo é preservar a
                  língua indígena, incentivando o uso da língua e sua cultura.
                </h6>
              </Col>
            </Row>
            {isLoading && <SpinLoader/>}
            <DataTable dados={dados} token={token} disabled
              setIsLoading={setIsLoading}
              />
          </CardBody>
        </Card>
      </Layout>
    );
  } else {
    return (
      <>
        <Layout>
          <Banner />
        </Layout>
      </>
    );
  }
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
