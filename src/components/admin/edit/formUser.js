import {
  Button,
  Label,
  FormGroup,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { userSchema } from "../../../schemas";
import connectionWaiwai from "../../../services/waiwaiApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormUsers = ({
  data,
  token,
  modal,
  setModal,
  pageState,
  setPageState,
  disabled,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    permission: 2,
  });
  const [modalExcluir, setModalExcluir] = useState(false);
  const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  };
  const toggleExcluir = () => setModalExcluir(!modalExcluir);

  const apiObj = new connectionWaiwai(token);
  const defaultPermission = [
    {
      value: "0",
      label: "Administrador",
    },
    {
      value: "1",
      label: "Colaborador",
    },
    {
      value: "2",
      label: "Visitante",
    },
  ];

  const notify = () => {
    toast("Default Notification !");

    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER,
    });

    toast.error("Error Notification !", {
      position: toast.POSITION.TOP_LEFT,
    });

    toast.warn("Warning Notification !", {
      position: toast.POSITION.BOTTOM_LEFT,
    });

    toast.info("Info Notification !", {
      position: toast.POSITION.BOTTOM_CENTER,
    });

    toast("Custom Style Notification with css class!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "foo-bar",
    });
  };
  const handleDeleteUser = async () => {
    await handleMutationDelete();
  };

  const fetchDados = () => {
    setPageState((old) => ({ ...old, isLoading: true }));
    apiObj.allUsers(pageState.pageSize, pageState.page).then((data) => {
      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: data.data,
        total: data.total,
      }));
      setModal(!modal);
    });
  };

  const handleMutationDelete = async () => {
    try {
      await apiObj.deleteUsers(data["id"]);
      setModal(!modal);
      toast.success("Usuário excluido com sucesso!", options);
      fetchDados();
    } catch (err) {
      toast.error("Erro ao excluir usuário.", {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      console.error({
        type: "error",
        message: "An error ocurred. Please, try again.",
      });
    }
  };

  useEffect(() => {
    if (data) {
      apiObj.getByIdUser(data["id"]).then((json) => {
        setFormValues({
          ...json,
          username: json.username || formValues.username,
          email: json.email || formValues.email,
          permission: json.permission || formValues.permission,
        });
      });
    }
  }, [data]);

  return (
    <Container>
      <ToastContainer />
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <Formik
                initialValues={{
                  username: formValues.username,
                  email: formValues.email,
                  permission: formValues.permission,
                }}
                validationSchema={userSchema}
                enableReinitialize
                onSubmit={async (fields) => {
                  try {
                    setIsLoading(true);
                    const response = await apiObj.updateUsers(
                      data["id"],
                      JSON.stringify(fields)
                    );

                    if (response.status === 204) {
                      toast.success("Usuário Alterado com sucesso!", options);
                    }
                  } catch (err) {
                    toast.error("Erro ao atualizar usuário.", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                    });
                    console.error({
                      type: "error",
                      message: "An error ocurred. Please, try again.",
                    });
                  }
                  fetchDados();
                  setIsLoading(false);
                }}
                render={({ errors, touched, setFieldValue }) => (
                  <Form>
                    <Row>
                      <FormGroup className="w-50 pr-3">
                        <Label htmlFor="username">Nome de usuário</Label>
                        <Field
                          disabled={disabled}
                          name="username"
                          type="textarea"
                          rows="1"
                          className={`form-control ${
                            errors.username && touched.username
                              ? " is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>

                      <FormGroup className="w-50">
                        <Label htmlFor="email">Email</Label>
                        <Field
                          disabled={disabled}
                          name="email"
                          type="textarea"
                          rows="1"
                          className={`form-control ${
                            errors.email && touched.email ? " is-invalid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup className="w-50">
                        <Label htmlFor="permission">Permissão de Usuário</Label>
                        <Field
                          disabled={disabled}
                          name="permission"
                          as="select"
                          className={`form-control ${
                            errors.permission && touched.permission
                              ? " is-invalid"
                              : ""
                          }`}
                        >
                          {defaultPermission.map((permission) => (
                            <option
                              key={permission.value}
                              value={permission.value}
                              selected={
                                permission.value === formValues.permission
                                  ? true
                                  : false
                              }
                            >
                              {permission.label}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="permission"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                    </Row>

                    <Row className="mt-3">
                      <FormGroup className="w-100">
                        <div /* className="d-flex justify-content-between" */>
                          <Button
                            type="submit"
                            color="success"
                            disabled={isLoading}
                            className="mx-3"
                          >
                            Salvar
                          </Button>
                          <Button color="danger" onClick={toggleExcluir}>
                            Excluir
                          </Button>
                        </div>
                      </FormGroup>
                    </Row>
                  </Form>
                )}
              />
            </CardBody>
            <div>
              <Modal isOpen={modalExcluir} toggle={toggleExcluir}>
                <ModalHeader toggle={toggleExcluir}>
                  Excluir usuário
                </ModalHeader>
                <ModalBody>
                  Tem certeza que deseja excluir este usuário?
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onClick={() => handleDeleteUser()}>
                    Sim, excluir
                  </Button>{" "}
                  <Button color="secondary" onClick={toggleExcluir}>
                    Cancelar
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormUsers;
