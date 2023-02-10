import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../src/layout/Layout";
import Banner3 from "../src/components/banner/Banner3";
import Banner from "../src/components/banner/Banner";
import { Card, CardBody, Row, Col } from "reactstrap";
import DataTable from "../src/components/table/Mui_datatables";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";

export default function MyWord({ token }) {
  const [dados, setDados] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (token) {
      axios
        .get(
          `${
            process.env.NEXT_PUBLIC_API_URL || window.NETLIFY_PUBLIC_VARIABLE
          }/palavras/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => res.data)
        .then((data) => {
          setDados(data);
        });
    }
  }, [token]);

  if (session) {
    return (
      <Layout>
        <Banner3 />
        <Card>
          <CardBody>
            <Row className="justify-content-center mb-3">
              <Col md="7" className="text-center">
                <span className="label label-danger label-rounded">
                  Tela de Minhas palavras
                </span>
                <h2 className="title">Palavras cadastradas por você.</h2>
                <h6 className="subtitle">
                  Encontre aqui todas as suas palavras cadastradas! Veja os
                  detalhes, expressões, imagens, áudio e significados em um
                  formato prático e fácil de usar.
                </h6>
              </Col>
            </Row>
            <DataTable
              dados={dados}
              setDados={setDados}
              token={token}
              showAction
            />
          </CardBody>
        </Card>
        <ToastContainer />
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
