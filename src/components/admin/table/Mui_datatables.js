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
import ModalAdminCustom from "../edit/modalCustom";
import FormWordAdmin from "../edit/formWordAdmin";
import FormUsers from "../edit/formUser";

const DataTableAdmin = ({
  pageState,
  setPageState,
  token,
  setIsLoading,
  columns,
  word,
  modal,
  setModal,
  disabled,
  showAction,
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
            setPageState((old) => ({ ...old, page: newPage + 1 }));
          }}
          onPageSizeChange={(newPageSize) =>
            setPageState((old) => ({ ...old, pageSize: newPageSize }))
          }
        />
      </div>
      <ModalAdminCustom toggle={toggle} modal={modal}>
        {showAction ? (
          <FormWordAdmin
            data={word}
            token={token}
            modal={modal}
            setModal={setModal}
            pageState={pageState}
            setPageState={setPageState}
            disabled={disabled}
            showAction={showAction}
          />
        ) : (
          <FormUsers
            data={word}
            token={token}
            modal={modal}
            setModal={setModal}
            pageState={pageState}
            setPageState={setPageState}
            disabled={disabled}
          />
        )}
      </ModalAdminCustom>
    </Container>
  );
};

export default DataTableAdmin;
