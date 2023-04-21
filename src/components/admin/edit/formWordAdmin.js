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
import { useEffect, useState, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropzone from "../../dragDrop";
import Image from "../../PreviewImagem";
import cuid from "cuid";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import ReactAudioPlayer from "react-audio-player";
import connectionWaiwai from "../../../services/waiwaiApi";
import { registerWordsSchema } from "../../../schemas";

const MyInput = ({ field, form, ...props }) => {
  return <Input {...field} {...props} />;
};

const FormWordAdmin = ({
  data,
  token,
  modal,
  setModal,
  pageState,
  setPageState,
  disabled,
  showAction
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    meaningWaiwai: "",
    meaningPort: "",
    phonemicWaiwai: "",
    exampleSentence: "",
    category: "",
    synonymPort: "",
    synonymWaiwai: "",
  });
  const [image, setImage] = useState(null);
  const [record, setRecord] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const [audioChanged, setAudioChanged] = useState(false);
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

  const toggleExcluir = () => setModalExcluir(!modalExcluir);

  const apiObj = new connectionWaiwai(token);
  const defaultCategories = [
    {
      value: "sem_registro",
      label: "Selecione",
    },
    {
      value: "cien_Saude",
      label: "Ciências da Saúde",
    },
    {
      value: "cien_Bio",
      label: "Ciências Biológicas",
    },
    {
      value: "arqueo",
      label: "Arqueologia",
    },
  ];
  const removeImage = () => {
    if (showAction) {
      setImageChanged(true);
    }
    setImage(null);
  };
  const removeAudio = () => {
    if (showAction) {
      setAudioChanged(true);
    }
    setRecord(null);
  };
  const addAudioElement = (blob) => {
    if (showAction) {
      setAudioChanged(true);
    }
    setRecord(blob);
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      let hashImage = cuid();
      reader.onload = function (e) {
        if (showAction) {
          setImageChanged(true);
        }
        setImage({ id: hashImage, src: e.target.result, name: file.name });
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const getUrlElement = (object) => {
    if (typeof object == "string") {
      return object;
    } else return URL.createObjectURL(object);
  };

  const handleDeleteWord = async () => {
    await handleMutationDelete();
  };

  const fetchDados = () => {
    setPageState((old) => ({ ...old, isLoading: true }));
    apiObj.allPalavras(pageState.pageSize, pageState.page).then((data) => {
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
      await apiObj.deletePalavra(data["id"]);
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
      apiObj.getByIdPalavra(data["id"]).then((json) => {
        setFormValues({
          ...json,
          meaningWaiwai: json.meaningWaiwai || formValues.meaningWaiwai,
          meaningPort: json.meaningPort || formValues.meaningPort,
          phonemicWaiwai: json.phonemicWaiwai || formValues.phonemicWaiwai,
          exampleSentence: json.exampleSentence || formValues.exampleSentence,
          category: json.category || formValues.category,
          synonymPort: json.synonymPort || formValues.synonymPort,
          synonymWaiwai: json.synonymWaiwai || formValues.synonymWaiwai,
        });
        if (json.image) {
          setImage({
            id: json.image,
            src: `${apiObj.baseURL}/uploads/${json.image}`,
            name: json.image,
          });
        }
        if (json.audio) setRecord(`${apiObj.baseURL}/uploads/${json.audio}`);
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
                  meaningWaiwai: formValues.meaningWaiwai,
                  meaningPort: formValues.meaningPort,
                  phonemicWaiwai: formValues.phonemicWaiwai,
                  exampleSentence: formValues.exampleSentence,
                  category: formValues.category,
                  synonymPort: formValues.synonymPort,
                  synonymWaiwai: formValues.synonymWaiwai,
                }}
                validationSchema={registerWordsSchema}
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
                        <Label htmlFor="meaningWaiwai">Palavra em Waiwai</Label>
                        <Field
                          disabled={disabled}
                          name="meaningWaiwai"
                          type="textarea"
                          rows="1"
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

                      <FormGroup className="w-50">
                        <Label htmlFor="meaningPort">
                          Significado em português
                        </Label>
                        <Field
                          disabled={disabled}
                          name="meaningPort"
                          type="textarea"
                          rows="1"
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
                    </Row>

                    <Row>
                      <FormGroup className="w-50 pr-3">
                        <Label htmlFor="phonemicWaiwai">
                          Pronuncia em Waiwai
                        </Label>
                        <Field
                          disabled={disabled}
                          name="phonemicWaiwai"
                          type="text"
                          onChange={(e) => {
                            setFieldValue(
                              "phonemicWaiwai",
                              e.target.value,
                              true
                            );
                          }}
                          className={`form-control ${
                            errors.phonemicWaiwai && touched.phonemicWaiwai
                              ? " is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="phonemicWaiwai"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>

                      <FormGroup className="w-50">
                        <Label htmlFor="category">Categoria da palavra</Label>
                        <Field
                          disabled={disabled}
                          name="category"
                          as="select"
                          className={`form-control ${
                            errors.category && touched.category
                              ? " is-invalid"
                              : ""
                          }`}
                        >
                          {defaultCategories.map((category) => (
                            <option
                              key={category.value}
                              value={category.value}
                              selected={
                                category.value === formValues.category
                                  ? true
                                  : false
                              }
                            >
                              {category.label}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="category"
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
                        <Label htmlFor="exampleSentence">
                          Exemplo em uma sentença
                        </Label>
                        <Field
                          disabled={disabled}
                          name="exampleSentence"
                          type="textarea"
                          className={`form-control ${
                            errors.exampleSentence && touched.exampleSentence
                              ? " is-invalid"
                              : ""
                          }`}
                          component={MyInput}
                        />
                        <ErrorMessage
                          name="exampleSentence"
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
                            <Label htmlFor="audio">Gravar áudio</Label>
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
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormWordAdmin;
