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
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSession } from "next-auth/react";
import Dropzone from "../dragDrop";
import Image from "../PreviewImagem";
// cuid is a simple library to generate unique IDs
import cuid from "cuid";

const MyInput = ({ field, form, ...props }) => {
  return <Input {...field} {...props} />;
};

const FormWord = ({ data, modal, setModal, setDados, showAction, token, disabled,}) => {

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
  const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  };

  const removeImage = () => {
    setImage(null)
  }
  const removeAudio = () => {
    setRecord(null)
  }

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
    acceptedFiles.map(file => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImage({ id: cuid(), src: e.target.result, name: file.name});
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
          setImage({ id: data.image, src: `http://localhost:5000/uploads/${data.image}`, name: data.image})
          // setRecord({ id: data.audio, src: `http://localhost:5000/uploads/${data.audio}`, name: data.audio})
        });
    }
  }, [data]);

  // useEffect(() => {
  //   if (imgAudio) {
  //     console.log(imgAudio["id_img"])
  //     axios
  //       .get(`http://localhost:5000/uploads/${imgAudio["id_img"]}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => res.data)
  //       .then((data) => {
  //         console.log(data)
  //       });
  //   }
  // }, [imgAudio, token]);

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
                  let response;
                  try {
                    setIsLoading(true);
                    response = await axios({
                      url: `http://localhost:5000/palavras/${userId}`,
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      data: JSON.stringify(fields),
                    });
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
                                <Button
                                  onClick={removeImage}
                                  type="button"
                                  color="none"
                                  className="px-1 py-0 my-0 mx-0 border border-white"
                                >
                                  <span className="badge bg-secondary ">x</span>
                                </Button>
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
                    </Row>

                    {showAction ? (
                      <Row className="mt-3">
                        <FormGroup className="w-100">
                          <div className="d-flex justify-content-between">
                            <Button
                              type="submit"
                              color="primary"
                              disabled={isLoading}
                            >
                              Enviar
                            </Button>
                            <Button
                              color="danger"
                              onClick={() => handleDeleteWord()}
                            >
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
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormWord;
