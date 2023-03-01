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

const DataTable = ({ dados, setDados, showAction, token, disabled, setIsLoading }) => {
  const [modal, setModal] = useModalDicionario();
  const toggle = () => setModal(!modal);
  const [word, setWord] = useState(null);
  const [rows, setRows] = useState([]);

  let columns = [
    {
      field: "meaningWaiwai",
      headerName: <strong>Em Waiwai</strong>,
      minWidth: 250,
    },
    { field: "meaningPort", headerName: <strong>Em Português</strong>, minWidth: 250 },
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

  useEffect(() => {
    if (dados) {
      setRows(() => {
        return dados.map((item) => ({ ...item, id: item["_id"] }));
      });
      setIsLoading(false)
    }
  }, [dados, setIsLoading]);

  return (
    <Container>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
      <Dicionario toggle={toggle} modal={modal}>
        <FormWord
          data={word}
          modal={modal}
          setModal={setModal}
          setDados={setDados}
          showAction={showAction}
          token={token}
          disabled={disabled}
        />
      </Dicionario>
    </Container>
  );
};

export default DataTable;
