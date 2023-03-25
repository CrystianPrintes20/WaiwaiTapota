import SidebarAdmin from "../../../src/components/sidebar";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import { useEffect, useState } from "react";
import { SpinLoader } from "../../../src/components/loading";
import DataTableAdmin from "../../../src/components/admin/table/Mui_datatables";
import connectionWaiwai from "../../../src/services/waiwaiApi";
import { useModalDicionario } from "../../../src/hooks/useModalDicionario";

export default function ListUsers({token}) {
  const [isLoading, setIsLoading] = useState(false);
  const [dados, setDados] = useState(null);
  const [word, setWord] = useState(null);
  const [modal, setModal] = useModalDicionario();


  useEffect(() => {
    if (token) {
      const apiObj = new connectionWaiwai(token);
      setIsLoading(true)
      apiObj.allUsers().then((data) => {
        setDados(data);
      });
    }
  }, [token]);

  let columns = [
    {
      field: "username",
      headerName: <strong>Username</strong>,
      minWidth: 250,
    },
    { field: "email", headerName: <strong>Email</strong>, minWidth: 250 },
    {
      field: "created",
      headerName: <strong>Cadastrado em</strong>,
      minWidth: 200,
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "updated",
      headerName: <strong>Ultima modificação</strong>,
      minWidth: 200,
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "action",
      headerName: <strong>Ação</strong>,
      minWidth: 200,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClick = (e) => {
          setWord(params.row);
          setModal(!modal);
        };
        return (
          <div>
            <Button variant="outlined" color="danger" onClick={onClick}>
              Detalhes
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <SidebarAdmin>
      <Card>
        <CardBody>
          <Row className="justify-content-center mb-3">
            <Col md="7" className="text-center">
              <span className="label label-danger label-rounded">
                Lista de Usuários cadastrados
              </span>
              <h2 className="title">Gerencie os usuarios de forma rápida.</h2>
              <h6 className="subtitle">
                Encontre aqui as opções de alterar as informações de usuarios e a opção de 
                excluir um determinado usuario.
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
            columns={columns}
            word={word}
            modal={modal}
            setModal={setModal}
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