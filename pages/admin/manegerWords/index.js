import SidebarAdmin from "../../../src/components/sidebar";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import { useEffect, useState } from "react";
import { SpinLoader } from "../../../src/components/loading";
import DataTableAdmin from "../../../src/components/admin/table/Mui_datatables";
import connectionWaiwai from "../../../src/services/waiwaiApi";
import { useModalDicionario } from "../../../src/hooks/useModalDicionario";

export default function ManegerWords({ token }) {
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

  let columns = [
    {
      field: "meaningWaiwai",
      headerName: <strong>Em Waiwai</strong>,
      minWidth: 180,
    },
    {
      field: "meaningPort",
      headerName: <strong>Em Português</strong>,
      minWidth: 230,
    }, 
    { field: "user", headerName: <strong>Usuário</strong>, minWidth: 180 },
    {
      field: "created",
      headerName: <strong>Cadastrado em</strong>,
      minWidth: 180,
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
  useEffect(() => {
    if (token) {
      const apiObj = new connectionWaiwai(token);
      setPageState(old => ({ ...old, isLoading: true}))
      setIsLoading(true)
      apiObj.allPalavras(pageState.pageSize, pageState.page).then((data) => {
        setPageState(old => ({ ...old, isLoading: false, data: data.data, total: data.total}))
      });
    }
  }, [token, pageState.pageSize, pageState.page]);
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
            pageState={pageState}
            setPageState={setPageState}
            token={token}
            setIsLoading={setIsLoading}
            columns={columns}
            word={word}
            modal={modal}
            setModal={setModal}
            showAction={true}
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