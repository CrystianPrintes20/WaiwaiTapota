import { useEffect, useState } from "react";
import Layout from "../src/layout/Layout";
import Banner3 from "../src/components/banner/Banner3";
import Banner from "../src/components/banner/Banner";
import { Card, CardBody } from "reactstrap";
import { useSession } from "next-auth/react";
import DataTable from "../src/components/table/Mui_datatables";
import axios from "axios";

export default function Dictionary({ token }) {
  const { data: session } = useSession();
  const [dados, setDados] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/palavras/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setDados(data);
      });
  }, [token]);

  if (session) {
    return (
      <Layout>
        <Banner3 />
        <Card>
          <CardBody>
            <DataTable dados={dados} token={token} disabled />
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
