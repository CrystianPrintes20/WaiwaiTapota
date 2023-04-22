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
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchPalavras = async () => {
        const apiObj = new connectionWaiwai(token);
        setIsLoading(true);
        setPageState((old) => ({ ...old, isLoading: true }));
        try {
          const { data, total } = await apiObj.allPalavras(
            pageState.pageSize,
            pageState.page
          );
          setPageState((old) => ({
            ...old,
            isLoading: false,
            data,
            total,
          }));
        } catch (error) {
          console.error("Failed to fetch data:", error);
          setIsLoading(false);
        }
    };
    fetchPalavras();
  }, [pageState.pageSize, pageState.page]);
  return (
    <Layout>
      <Banner3 />
      <Card>
        <CardBody>
          <Row className="justify-content-center mb-3">
            <Col md="7" className="text-center">
              <span className="label label-danger label-rounded">
                Tela de Dicionario
              </span>
              <h2 className="title">Está procurando alguma palavra?</h2>
              <h6 className="subtitle">
                Seja bem-vindo ao nosso dicionário online! Aqui você encontrará
                uma lista de palavras, frases, expressões e termos usados na
                língua materna Waiwai. Nosso objetivo é preservar a língua
                indígena, incentivando o uso da língua e sua cultura.
              </h6>
            </Col>
          </Row>
          {isLoading && <SpinLoader />}
          <DataTable
            pageState={pageState}
            setPageState={setPageState}
            token={token}
            disabled
            setIsLoading={setIsLoading}
          />
        </CardBody>
      </Card>
    </Layout>
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
