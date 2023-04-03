import { useEffect, useState } from "react";
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
import { userSchema } from "../../../schemas";
import connectionWaiwai from "../../../services/waiwaiApi";

const FormUsers = (
  data,
  token,
  modal,
  setModal,
  setPageState,
  disabled
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    permission: 2
  });
  const [modalExcluir, setModalExcluir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);

  const toggleExcluir = () => setModalExcluir(!modalExcluir);
  const toggleEditar = () => setModalEditar(!modalEditar);
  console.log("qde",token)


  const apiObj = new connectionWaiwai(token)
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

  useEffect(() => {
    if (data) {
      apiObj.getByIdUser(data.data["id"]).then((json) => {
        setFormValues({
          ...json,
          username: json.data.username || formValues.username,
          email: json.data.email || formValues.email,
          permission: json.data.permission || formValues.permission
        });
      })
     
    }
  }, [data]);

  useEffect(()=>{
    console.log(token)
  }, [token])

  return (
    <Container>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <Formik
                initialValues={{
                  username: formValues.username,
                  email: formValues.email,
                  permission: formValues.permission
                }}
                validationSchema={userSchema}
                enableReinitialize
                onSubmit={async (fields) => {
                  try {
                    setIsLoading(true);
                    const response = await apiObj.updatePalavra(
                      data["id"],
                      JSON.stringify(fields)
                    );
                    if (response.status === 204) {
                      toast.success("Palavra atualizada com sucesso!", options);
                    }
                    if (imageChanged) {
                      if (formValues.image) {
                        if (image) {
                          await apiObj.deleteUpload(formValues.image);
                          const blobData = await (
                            await fetch(image.src)
                          ).blob();
                          let uploadImage = new FormData();
                          uploadImage.append("file", blobData, image.name);
                          uploadImage.append("oidword", data._id);
                          let responseImage = await apiObj.createUpload(
                            uploadImage
                          );
                        } else {
                          await apiObj.deleteUpload(formValues.image);
                        }
                      } else {
                        if (image) {
                          const blobData = await (
                            await fetch(image.src)
                          ).blob();
                          let uploadImage = new FormData();
                          uploadImage.append("file", blobData, image.name);
                          uploadImage.append("oidword", data._id);
                          let responseImage = await apiObj.createUpload(
                            uploadImage
                          );
                        }
                      }
                    }
                    if (audioChanged) {
                      if (formValues.audio) {
                        if (record) {
                          await apiObj.deleteUpload(formValues.audio);
                          const event = new Date();
                          let uploadRecord = new FormData();
                          uploadRecord.append(
                            "file",
                            record,
                            `${event.toISOString()}.weba`
                          );
                          uploadRecord.append("oidword", data["_id"]);
                          let responseRecord = await apiObj.createUpload(
                            uploadRecord
                          );
                        } else {
                          await apiObj.deleteUpload(formValues.audio);
                        }
                      } else {
                        if (record) {
                          const event = new Date();
                          let uploadRecord = new FormData();
                          uploadRecord.append(
                            "file",
                            record,
                            `${event.toISOString()}.weba`
                          );
                          uploadRecord.append("oidword", data["_id"]);
                          let responseRecord = await apiObj.createUpload(
                            uploadRecord
                          );
                        }
                      }
                    }
                  } catch (err) {
                    toast.error("Erro ao atualizar palavra.", {
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
                  Excluir palavra
                </ModalHeader>
                <ModalBody>
                  Tem certeza que deseja excluir esta palavra?
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onClick={() => handleDeleteWord()}>
                    Sim, excluir
                  </Button>{" "}
                  <Button color="secondary" onClick={toggleExcluir}>
                    Cancelar
                  </Button>
                </ModalFooter>
              </Modal>

              <Modal isOpen={modalEditar} toggle={toggleEditar}>
                <ModalHeader toggle={toggleEditar}>Editar palavra</ModalHeader>
                <ModalBody>
                  Todas suas mudanças serão aplicadas, confirme as alterações.
                </ModalBody>
                <ModalFooter>
                  <Button color="success" onClick={() => handleDeleteWord()}>
                    Confirmar
                  </Button>{" "}
                  <Button color="secondary" onClick={toggleEditar}>
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
