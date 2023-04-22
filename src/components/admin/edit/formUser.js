import React, { useState, useEffect } from "react";
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
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
  const toggleExcluir = () => setModalExcluir(!modalExcluir);
  const apiObj = new connectionWaiwai(token);

  const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  };

  const defaultPermission = [
    {
      value: 1,
      label: "Visitante",
    },
    {
      value: 2,
      label: "Colaborador",
    },
    {
      value: 3,
      label: "Administrador",
    },
  ];

  const handleDeleteUser = async () => {
    await handleMutationDelete();
  };

  const fetchDados = async () => {
    try {
      setIsLoading(true);
      const {data, total} = await apiObj.allUsers(pageState.pageSize, pageState.page);
      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: data,
        total: total,
      }));
      setModal(!modal);
    } catch (err) {
      setIsLoading(false);
      toast.error("Erro ao buscar dados.", options);
      console.error({
        type: "error",
        message: "An error occurred. Please, try again.",
      });
    }
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
        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          username: json.username || prevFormValues.username,
          email: json.email || prevFormValues.email,
          permission: json.permission || prevFormValues.permission,
        }));
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
                  const fieldsFormatted = {
                    ...fields,
                    permission: parseInt(fields.permission)
                  }
                  try {
                    setIsLoading(true);
                    const response = await apiObj.updateUsers(
                      data["id"],
                      JSON.stringify(fieldsFormatted)
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
                  } finally{
                    fetchDados();
                    setIsLoading(false);
                  }
                  
                }}
                render={({ errors, touched, setFieldValue }) => (
                  <Form>
                    <Row>
                      <FormGroup className="w-50 pr-3">
                        <Label htmlFor="username">Nome de usuário</Label>
                        <Field
                          disabled={true}
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
                          disabled={true}
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
                    <Row>
                      <FormGroup className="w-50 pr-3">
                        <Label htmlFor="password">Alterar senha</Label>
                        <Field
                          name="password"
                          type="password"
                          className={`form-control${
                            errors.password && touched.password
                              ? " is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup className="w-50">
                        <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                        <Field
                          name="confirmPassword"
                          type="password"
                          className={`form-control${
                            errors.confirmPassword && touched.confirmPassword
                              ? " is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="confirmPassword"
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
