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
import FormWord from "../../edit/formWord";
import ModalAdminCustom from "../edit/modalCustom";
import FormUsers from "../edit/formUser";

const DataTableAdmin = ({
  dados,
  setDados,
  showAction,
  token,
  disabled,
  setIsLoading,
  columns,
  word,
  modal,
  setModal,
}) => {
  const toggle = () => setModal(!modal);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (dados) {
      setRows(() => {
        console.log(dados);
        return dados?.map((item) => ({ ...item, id: item["_id"] }));
      });
      setIsLoading(false);
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
      <ModalAdminCustom toggle={toggle} modal={modal}>
        {/*   <FormWord
          data={word}
          modal={modal}
          setModal={setModal}
          setDados={setDados}
          showAction={showAction}
          token={token}
          disabled={disabled}
        /> */}
        <FormUsers
          data={word}
          modal={modal}
          setModal={setModal}
          setDados={setDados}
          token={token}
          disabled={disabled}
        />
      </ModalAdminCustom>
    </Container>
  );
};

export default DataTableAdmin;