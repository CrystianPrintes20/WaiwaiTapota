import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "reactstrap";
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
  const [rows, setRows] = useState([]);
  const toggle = () => setModal(!modal);

  const handlePageChange = (newPage) => {
    setPageState((old) => ({ ...old, page: newPage + 1 }));
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageState((old) => ({ ...old, pageSize: newPageSize }));
  };

  useEffect(() => {
    if (pageState) {
      setRows(
        pageState.data?.map((item) => ({ ...item, id: item["_id"] })) || []
      );
      setIsLoading(false);
    }
  }, [pageState, setIsLoading]);

  return (
    <Container>
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          rowsPerPageOptions={[10, 30, 50, 70, 100]}
          page={pageState.page - 1}
          pageSize={pageState.pageSize}
          pageSizeOptions={[5]}
          paginationMode="server"
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
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
