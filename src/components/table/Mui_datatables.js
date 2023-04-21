import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
} from "reactstrap";
import { useModalDicionario } from "../../hooks/useModalDicionario";
import Dicionario from "../edit/Dicionario";
import FormWord from "../edit/formWord";

const DataTable = ({
  pageState,
  setPageState,
  showAction,
  token,
  disabled,
  setIsLoading,
}) => {
  const [modal, setModal] = useModalDicionario();
  const toggle = () => setModal(!modal);
  const [word, setWord] = useState(null);
  const [rows, setRows] = useState([]);

  let columns = [
    {
      field: "meaningWaiwai",
      headerName: <strong>Em Waiwai</strong>,
      minWidth: 180,
    },
    {
      field: "meaningPort",
      headerName: <strong>Em Português</strong>,
      minWidth: 250,
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
    if (pageState) {
      setRows(() => {
        return pageState.data?.map((item) => ({ ...item, id: item["_id"] }));
      });
      setIsLoading(false);
    }
  }, [pageState, setIsLoading]);


  return (
    <Container>
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          //autoHeight
          rows={rows}
          columns={columns}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          rowsPerPageOptions={[10, 30, 50, 70, 100]}
          page={pageState.page - 1}
          pageSize={pageState.pageSize}
          pageSizeOptions={[5]}
          paginationMode="server"
          onPageChange={(newPage) => {
            setPageState((old) => ({ ...old, page: newPage + 1}));
          }}
          onPageSizeChange={(newPageSize) =>
            setPageState((old) => ({ ...old, pageSize: newPageSize }))
          }
        />
      </div>
      <Dicionario toggle={toggle} modal={modal}>
        <FormWord
          data={word}
          modal={modal}
          setModal={setModal}
          setPageState={setPageState}
          pageState={pageState}
          showAction={showAction}
          token={token}
          disabled={disabled}
        />
      </Dicionario>
    </Container>
  );
};

export default DataTable;
