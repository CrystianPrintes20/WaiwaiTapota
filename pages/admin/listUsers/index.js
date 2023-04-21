import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import { SpinLoader } from "../../../src/components/loading";
import DataTableAdmin from "../../../src/components/admin/table/Mui_datatables";
import connectionWaiwai from "../../../src/services/waiwaiApi";
import { useModalDicionario } from "../../../src/hooks/useModalDicionario";
import SidebarAdmin from "../../../src/components/sidebar";

export default function ListUsers({ token }) {
  const [isLoading, setIsLoading] = useState(false);
  const [word, setWord] = useState(null);
  const [modal, setModal] = useModalDicionario();
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
  });

  const onClick = useCallback(
    (params) => {
      setWord(params.row);
      setModal(!modal);
    },
    [modal]
  );

  const columns = useMemo(
    () => [
      {
        field: "username",
        headerName: <strong>Username</strong>,
        minWidth: 200,
      },
      { field: "email", headerName: <strong>Email</strong>, minWidth: 250 },
      {
        field: "permission",
        headerName: <strong>Permissão</strong>,
        minWidth: 100,
      },
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
        minWidth: 180,
        type: "dateTime",
        valueGetter: ({ value }) => value && new Date(value),
      },
      {
        field: "action",
        headerName: <strong>Ação</strong>,
        minWidth: 180,
        sortable: false,
        disableClickEventBubbling: true,

        renderCell: (params) => {
          return (
            <div>
              <Button
                variant="outlined"
                color="danger"
                onClick={() => onClick(params)}
              >
                Detalhes
              </Button>
            </div>
          );
        },
      },
    ],
    [onClick]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const apiObj = new connectionWaiwai(token);
        setIsLoading(true);
        setPageState((old) => ({ ...old, isLoading: true }));
        try {
          const { data, total } = await apiObj.allUsers(
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
      }
    };
    fetchData();
  }, [token, pageState.pageSize, pageState.page]);

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
                Encontre aqui as opções de alterar as informações de usuarios e
                a opção de excluir um determinado usuario.
              </h6>
            </Col>
          </Row>
          {isLoading && <SpinLoader />}
          <DataTableAdmin
            pageState={pageState}
            setPageState={setPageState}
            token={token}
            setIsLoading={setIsLoading}
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
