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
  pageState,
  setPageState,
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
      <ModalAdminCustom toggle={toggle} modal={modal}>
        {console.log("hhhh", token)}
        <FormUsers
          data={word}
          token={token}
          modal={modal}
          setModal={setModal}
          setPageState={setPageState}
          disabled={disabled}
        />
      </ModalAdminCustom>
    </Container>
  );
};

export default DataTableAdmin;