import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../src/layout/Layout";
import Banner from "../src/components/banner/Banner";
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
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import Banner3 from "../src/components/banner/Banner3";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useCallback } from "react";
import Dropzone from "../src/components/dragDrop";
import ImagePrev from "../src/components/PreviewImagem";
import ReactAudioPlayer from "react-audio-player";
import connectionWaiwai from "../src/services/waiwaiApi";

/**
 * Importações para entrada de áudio
 */
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

// cuid is a simple library to generate unique IDs
import cuid from "cuid";

const MyInput = ({ field, form, ...props }) => {
  return <Input {...field} {...props} />;
};

export default function RegisterWords({ token }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const [imageWord, setImageWord] = useState(null);

  /*
   * Módulo para entrada de áudio
   */
  const [record, setRecord] = useState(null);
  const recorderControls = useAudioRecorder();

  const removeImage = () => {
    setImageWord(null);
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
        setImageWord({ id: cuid(), src: e.target.result, name: file.name });
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const initialValues = {
    meaningWaiwai: "",
    meaningPort: "",
    phonemicWaiwai: "",
    exampleSentence: "",
    category: "",
    synonymPort: "",
    synonymWaiwai: "",
  };

  const validationSchema = Yup.object().shape({
    meaningWaiwai: Yup.string().required("Este campo é obrigatorio."),
    meaningPort: Yup.string().required("Este campo é obrigatorio."),
    /* phonemicWaiwai: Yup.string().required("Este campo é obrigatorio."), */
    exampleSentence: Yup.string().required("Este campo é obrigatorio."),
    category: Yup.string().required("Este campo é obrigatorio."),
    /*   synonymPort: Yup.string().required("Este campo é obrigatorio."),
    synonymWaiwai: Yup.string().required("Este campo é obrigatorio."), */
  });

  if (session) {
    return (
      <>
        <Layout>
          <Banner3 />
          <Card className="feature4">
            <Container>
              <Row className="justify-content-center">
                <h2 className="mx-3 my-5 text-center">
                  Contribua e melhore o Dicionário WaiWai!
                </h2>
              </Row>
              <Row>
                <Col sm="4">
                  <Card>
                    <img
                      className="rounded mx-auto d-block"
                      alt="Card"
                      src="./tapotaIcon.png"
                      height={200}
                    />
                    <CardBody className="text-justify">
                      <p>
                        Aprenda Wai Wai de uma forma inovadora. Com o Dicionário
                        Wai Wai você encontra termos de Wai Wai para o Português
                        em um aplicativo fácil de usar.
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="8">
                  <Card>
                    <h4 className="mb-3 fw-bold">Cadastro de Palavras</h4>
                    <CardBody>
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (fields) => {
                          const apiObj = new connectionWaiwai(token);
                          try {
                            setIsLoading(true);

                            let response = await apiObj.createPalavra(
                              JSON.stringify(fields)
                            );

                            if (imageWord) {
                              // https://stackoverflow.com/questions/12168909/blob-from-dataurl
                              const blobData = await (
                                await fetch(imageWord.src)
                              ).blob();
                              let uploadImage = new FormData();
                              uploadImage.append(
                                "file",
                                blobData,
                                imageWord.name
                              );
                              uploadImage.append("oidword", response.data._id);
                              let responseImage = await apiObj.createUpload(
                                uploadImage
                              );
                            }
                            if (record) {
                              const event = new Date();
                              let uploadRecord = new FormData();
                              uploadRecord.append(
                                "file",
                                record,
                                `${event.toISOString()}.weba`
                              );
                              uploadRecord.append("oidword", response.data._id);
                              let responseRecord = await apiObj.createUpload(
                                uploadRecord
                              );
                            }
                            console.log("ss", response);
                            if (response.status === 201) {
                              toast.success(
                                "Nova palavra adicionada com sucesso!",
                                {
                                  position: "top-right",
                                  autoClose: 5000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: false,
                                  draggable: true,
                                  progress: undefined,
                                }
                              );
                              router.push("/myWord");
                            }
                          } catch (err) {
                            if (
                              err?.response.status === 409 ||
                              err?.response?.data?.message
                            ) {
                              toast.error(
                                "Palavra já cadastrada! Verifique-a e tente novamente.",
                                {
                                  position: "top-right",
                                  autoClose: 5000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: false,
                                  draggable: true,
                                  progress: undefined,
                                }
                              );
                              console.log({
                                type: "error",
                                message: err.response.data.message,
                              });
                            } else {
                              toast.error("Erro ao cadastrar.", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                              });
                              console.log({
                                type: "error",
                                message: "An error ocurred. Please, try again.",
                              });
                            }
                          }
                          setIsLoading(false);
                        }}
                        render={({ errors, touched }) => (
                          <Form>
                            <Row>
                              <FormGroup className="col-md-6 col-sm-12">
                                <Label htmlFor="meaningWaiwai">
                                  Palavra em Waiwai
                                </Label>
                                <Field
                                  name="meaningWaiwai"
                                  type="textarea"
                                  rows="1"
                                  className={`form-control ${
                                    errors.meaningWaiwai &&
                                    touched.meaningWaiwai
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
                              <FormGroup className="col-md-6 col-sm-12">
                                <Label htmlFor="meaningPort">
                                  Significado em português
                                </Label>
                                <Field
                                  name="meaningPort"
                                  type="textarea"
                                  rows="1"
                                  id="meaningPort"
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
                              <FormGroup className="pr-3 col-md-6 col-sm-12">
                                <Label htmlFor="phonemicWaiwai">
                                  Pronuncia em Waiwai
                                </Label>
                                <Field
                                  name="phonemicWaiwai"
                                  type="text"
                                  className={`form-control ${
                                    errors.phonemicWaiwai &&
                                    touched.phonemicWaiwai
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
                              <FormGroup className="col-md-6 col-sm-12">
                                <Label htmlFor="category">
                                  Categoria da palavra
                                </Label>
                                <Field
                                  name="category"
                                  as="select"
                                  className={`form-control ${
                                    errors.category && touched.category
                                      ? " is-invalid"
                                      : ""
                                  }`}
                                >
                                  <option selected value="sem registro">
                                    Selecione
                                  </option>
                                  <option value="cien_Saude">
                                    Ciências da Saúde
                                  </option>
                                  <option value="cien_Bio">
                                    Ciências Biológicas
                                  </option>
                                  <option value="arqueo">
                                    Arqueologia
                                  </option>
                                </Field>
                                <ErrorMessage
                                  name="category"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </FormGroup>
                            </Row>
                            <Row>
                              <FormGroup className="col-md-6 col-sm-12">
                                <Label htmlFor="synonymPort">
                                  Sinonimo em Portugues
                                </Label>
                                <Field
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
                              <FormGroup className="col-md-6 col-sm-12">
                                <Label htmlFor="synonymWaiwai">
                                  Sinonimo Waiwai
                                </Label>
                                <Field
                                  name="synonymWaiwai"
                                  type="text"
                                  className={`form-control ${
                                    errors.synonymWaiwai &&
                                    touched.synonymWaiwai
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
                              <FormGroup className="col-md-12 col-sm-12">
                                <Label htmlFor="exampleSentence">
                                  Exemplo em uma sentença
                                </Label>
                                <Field
                                  name="exampleSentence"
                                  type="textarea"
                                  rows="3"
                                  id="exampleSentence"
                                  className={`form-control ${
                                    errors.exampleSentence &&
                                    touched.exampleSentence
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
                              <FormGroup className="col-md-6 col-sm-12">
                                <Label htmlFor="img_logo">
                                  Insira uma image
                                </Label>
                                <div style={{ border: "3px #00806b dashed" }}>
                                  {imageWord ? (
                                    <>
                                      <div className="d-flex justify-content-end">
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
                                      </div>
                                      <ImagePrev image={imageWord} />
                                    </>
                                  ) : (
                                    <>
                                      <Dropzone
                                        onDrop={onDrop}
                                        accept={"image/*"}
                                      />
                                    </>
                                  )}
                                </div>
                              </FormGroup>
                              <FormGroup className="col-md-6 col-sm-12">
                                <Label htmlFor="audio">Gravar audio</Label>
                                <AudioRecorder
                                  onRecordingComplete={(blob) =>
                                    addAudioElement(blob)
                                  }
                                  recorderControls={recorderControls}
                                />
                                <div className="my-2">
                                  {record ? (
                                    <>
                                      <div className="d-flex justify-content-start">
                                        <ReactAudioPlayer
                                          src={URL.createObjectURL(record)}
                                          controls
                                        />
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
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </FormGroup>
                            </Row>
                            <Row className="mt-3">
                              <FormGroup>
                                <Button
                                  type="submit"
                                  color="danger"
                                  className="me-2"
                                  disabled={isLoading}
                                >
                                  Salvar
                                </Button>
                                <Button
                                  type="reset"
                                  color="success"
                                  className="mx-3"
                                  disabled={isLoading}
                                >
                                  Cancelar
                                </Button>
                              </FormGroup>
                            </Row>
                          </Form>
                        )}
                      />
                      <ToastContainer />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Card>
        </Layout>
      </>
    );
  }
  return (
    <>
      <Layout>
        <Banner />
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  /**
   * Necessário signin para coletar o token válido, contrário retorna null
   */
  const accessToken = req.cookies.accessToken ? req.cookies.accessToken : null;
  return {
    props: { token: accessToken }, // will be passed to the page component as props
  };
}
