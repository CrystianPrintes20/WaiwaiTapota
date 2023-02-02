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

const DataTable = ({ dados, setDados, showAction, token, disabled }) => {
  const [modal, setModal] = useModalDicionario();
  const toggle = () => setModal(!modal);
  const [word, setWord] = useState(null);
  const [rows, setRows] = useState([]);

  let columns = [
    { field: "wordPort", headerName: "Em Português", minWidth: 250 },
    { field: "translationWaiwai", headerName: "Em Waiwai", minWidth: 250 },
    {
      field: "created",
      headerName: "Cadastrado em",
      minWidth: 200,
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "updated",
      headerName: "Ultima modificação",
      minWidth: 200,
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "action",
      headerName: "Ação",
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
            <Button variant="outlined" color="success" onClick={onClick}>
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
    }
  }, [dados]);

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
