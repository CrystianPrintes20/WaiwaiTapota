import {
  Button,
  Label,
  FormGroup,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Dropzone from "../dragDrop";
import Image from "../PreviewImagem";
// cuid is a simple library to generate unique IDs
import cuid from "cuid";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import ReactAudioPlayer from "react-audio-player";

const MyInput = ({ field, form, ...props }) => {
  return <Input {...field} {...props} />;
};

const FormWord = ({
  data,
  modal,
  setModal,
  setDados,
  showAction,
  token,
  disabled,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState();
  const [formValues, setFormValues] = useState({
    wordPort: "",
    translationWaiwai: "",
    category: "",
    meaningPort: "",
    meaningWaiwai: "",
    synonymPort: "",
    synonymWaiwai: "",
  });
  const [image, setImage] = useState(null);
  const [record, setRecord] = useState(null);
  const [idImage, setIdImage] = useState(null)
  const [idAudio, setIdAudio] = useState(null)
  const recorderControls = useAudioRecorder();
  const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  };
  const [modalExcluir, setModalExcluir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);

  const toggleExcluir = () => setModalExcluir(!modalExcluir);
  const toggleEditar = () => setModalEditar(!modalEditar);

  const removeImage = () => {
    setImage(null);
  };
  const removeAudio = () => {
    setRecord(null);
  };
  const addAudioElement = (blob) => {
    setRecord(blob);
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImage({ id: cuid(), src: e.target.result, name: file.name });
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const validationSchema = Yup.object().shape({
    wordPort: Yup.string().required("Este campo é obrigatorio."),
    translationWaiwai: Yup.string().required("Este campo é obrigatorio."),
    category: Yup.string().required("Este campo é obrigatorio."),
    meaningPort: Yup.string().required("Este campo é obrigatorio."),
    meaningWaiwai: Yup.string().required("Este campo é obrigatorio."),
    synonymPort: Yup.string().required("Este campo é obrigatorio."),
    synonymWaiwai: Yup.string().required("Este campo é obrigatorio."),
  });

  const getUrlElement = (object) => {
    if (typeof object == "string") {
      return object;
    } else URL.createObjectURL(object);
  };

  const handleDeleteWord = async () => {
    await handleMutationDelete();
  };

  const fetchDados = () => {
    axios
      .get("http://localhost:5000/palavras/me ", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setDados(data);
        setModal(!modal);
        // toast.success("Palavra atualizada com sucesso!", options);
      });
  };

  const handleMutationDelete = async () => {
    try {
      await axios({
        url: `http://localhost:5000/palavras/${userId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setModal(!modal);
      toast.success("Palavra excluida com sucesso!", options);
      fetchDados();
    } catch (err) {
      toast.error("Erro ao excluir palavra.", {
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
  };

  useEffect(() => {
    if (data) {
      setUserId(data.id);
      setFormValues({
        wordPort: data.wordPort || formValues.wordPort,
        translationWaiwai:
          data.translationWaiwai || formValues.translationWaiwai,
        category: data.category || formValues.category,
        meaningPort: data.meaningPort || formValues.meaningPort,
        meaningWaiwai: data.meaningWaiwai || formValues.meaningWaiwai,
        synonymPort: data.synonymPort || formValues.synonymPort,
        synonymWaiwai: data.synonymWaiwai || formValues.synonymWaiwai,
      });
    }
  }, [
    data,
    formValues.category,
    formValues.meaningWaiwai,
    formValues.meaningPort,
    formValues.synonymPort,
    formValues.synonymWaiwai,
    formValues.translationWaiwai,
    formValues.wordPort,
  ]);

  useEffect(() => {
    if (data) {
      axios
        .get(`http://localhost:5000/palavras/${data["id"]}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data)
        .then((data) => {
          setIdImage(data.image)
          setImage({
            id: data.image,
            src: `http://localhost:5000/uploads/${data.image}`,
            name: data.image,
          });
          setIdAudio(data.audio)
          setRecord(`http://localhost:5000/uploads/${data.audio}`);
        });
    }
  }, [data]);

  return (
    <Container>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <Formik
                initialValues={{
                  wordPort: formValues.wordPort,
                  translationWaiwai: formValues.translationWaiwai,
                  category: formValues.category,
                  meaningPort: formValues.meaningPort,
                  meaningWaiwai: formValues.meaningWaiwai,
                  synonymPort: formValues.synonymPort,
                  synonymWaiwai: formValues.synonymWaiwai,
                }}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={async (fields) => {
                  try {
                    setIsLoading(true);
                    const response = await axios.put(
                      `http://localhost:5000/palavras/${userId}`,
                      JSON.stringify(fields),
                      {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
                  
                    if (response.status === 204) {
                      toast.success("Palavra atualizada com sucesso!", options);
                      fetchDados();
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
                  setIsLoading(false);
                }}
                render={({ errors, touched, setFieldValue }) => (
                  <Form>
                    <Row>
                      <FormGroup className="w-50 pr-3">
                        <Label htmlFor="wordPort">Palavra em português</Label>
                        <Field
                          disabled={disabled}
                          name="wordPort"
                          type="text"
                          onChange={(e) => {
                            setFieldValue("wordPort", e.target.value, true);
                          }}
                          className={`form-control ${
                            errors.wordPort && touched.wordPort
                              ? " is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="wordPort"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>

                      <FormGroup className="w-50">
                        <Label htmlFor="translationWaiwai">
                          Tradução em Waiwai
                        </Label>
                        <Field
                          disabled={disabled}
                          name="translationWaiwai"
                          type="text"
                          className={`form-control ${
                            errors.translationWaiwai &&
                            touched.translationWaiwai
                              ? " is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="translationWaiwai"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                    </Row>

                    <Row>
                      <FormGroup className="w-50 pr-3">
                        <Label htmlFor="meaningPort">
                          Significado em português
                        </Label>
                        <Field
                          disabled={disabled}
                          name="meaningPort"
                          type="textarea"
                          className={`form-control ${
                            errors.meaningPort && touched.meaningPort
                              ? " is-invalid"
                              : ""
                          }`}
                          component={MyInput}
                        />
                        <ErrorMessage
                          name="meaningPort"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>

                      <FormGroup className="w-50">
                        <Label htmlFor="meaningWaiwai">
                          Significado em Waiwai
                        </Label>
                        <Field
                          disabled={disabled}
                          name="meaningWaiwai"
                          type="textarea"
                          className={`form-control ${
                            errors.meaningWaiwai && touched.meaningWaiwai
                              ? " is-invalid"
                              : ""
                          }`}
                          component={MyInput}
                        />
                        <ErrorMessage
                          name="meaningWaiwai"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                    </Row>

                    <Row>
                      <FormGroup className="w-50 pr-3">
                        <Label htmlFor="synonymPort">
                          Sinonimo em Portugues
                        </Label>
                        <Field
                          disabled={disabled}
                          name="synonymPort"
                          type="text"
                          className={`form-control ${
                            errors.synonymPort && touched.synonymPort
                              ? " is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="synonymPort"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>

                      <FormGroup className="w-50">
                        <Label htmlFor="synonymWaiwai">Sinonimo Waiwai</Label>
                        <Field
                          disabled={disabled}
                          name="synonymWaiwai"
                          type="text"
                          className={`form-control ${
                            errors.synonymWaiwai && touched.synonymWaiwai
                              ? " is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="synonymWaiwai"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                    </Row>

                    <Row>
                      <FormGroup className="w-100">
                        <Label htmlFor="category">Categoria da palavra</Label>
                        <Field
                          disabled={disabled}
                          name="category"
                          type="text"
                          className={`form-control ${
                            errors.category && touched.category
                              ? " is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="category"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup className="w-50 pr-3">
                        <Label htmlFor="img_logo">Insira uma image</Label>
                        <div style={{ border: "3px #00806b dashed" }}>
                          {image ? (
                            <>
                              <div className="d-flex justify-content-end">
                                {showAction ? (
                                  <>
                                    <Button
                                      onClick={removeImage}
                                      type="button"
                                      color="none"
                                      className="px-1 py-0 my-0 mx-0 border border-white"
                                    >
                                      <span className="badge bg-secondary ">
                                        x
                                      </span>
                                    </Button>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <Image image={image} />
                            </>
                          ) : (
                            <>
                              <Dropzone onDrop={onDrop} accept={"image/*"} />
                            </>
                          )}
                        </div>
                      </FormGroup>

                      <FormGroup className="w-50">
                        {showAction ? (
                          <>
                            <Label htmlFor="audio">Gravar audio</Label>
                            <AudioRecorder
                              onRecordingComplete={(blob) =>
                                addAudioElement(blob)
                              }
                              recorderControls={recorderControls}
                            />
                          </>
                        ) : (
                          <>
                            <Label htmlFor="audio">Ouvir audio</Label>
                          </>
                        )}

                        <div className="my-3">
                          {record ? (
                            <>
                              <div className="d-flex justify-content-start">
                                <ReactAudioPlayer
                                  src={getUrlElement(record)}
                                  controls
                                />
                                {showAction ? (
                                  <Button
                                    onClick={removeAudio}
                                    type="button"
                                    color="none"
                                    className="px-1 py-0 my-0 mx-0 border border-white"
                                  >
                                    <span className="badge bg-secondary">
                                      x
                                    </span>
                                  </Button>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </FormGroup>
                    </Row>

                    {showAction ? (
                      <Row className="mt-3">
                        <FormGroup className="w-100">
                          <div className="d-flex justify-content-between">
                            <Button
                              type="submit"
                              color="success"
                              disabled={isLoading}
                            >
                              Salvar
                            </Button>
                            <Button color="danger" onClick={toggleExcluir}>
                              Excluir
                            </Button>
                          </div>
                        </FormGroup>
                      </Row>
                    ) : null}
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

export default FormWord;
