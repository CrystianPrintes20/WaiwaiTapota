import {
  Button,
  Label,
  FormGroup,
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {useSession } from "next-auth/react";



const FormWord = ({ data, modal, setModal, setDados }) => {

    const [token, setToken] = useState()
  const { data: session } = useSession();
  
    useEffect(() => {
        if (session) {
          setToken(session?.user?.token)
        }
      }, [session])

  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState();
  const [formValues, setFormValues] = useState({
    word_portugues: "",
    translation_Waiwai: "",
    category: "",
    meaning_Portuguese: "",
    meaningWaiwai: "",
    synonymPortugues: "",
    synonymWaiwai: "",
  });

  const validationSchema = Yup.object().shape({
    word_portugues: Yup.string().required("Este campo é obrigatorio."),
    translation_Waiwai: Yup.string().required("Este campo é obrigatorio."),
    category: Yup.string().required("Este campo é obrigatorio."),
    meaning_Portuguese: Yup.string().required("Este campo é obrigatorio."),
    meaningWaiwai: Yup.string().required("Este campo é obrigatorio."),
    synonymPortugues: Yup.string().required("Este campo é obrigatorio."),
    synonymWaiwai: Yup.string().required("Este campo é obrigatorio.")
  });

  const handleDeleteWord = async () => {
    await handleMutationDelete()
  }

  const fetchDados = () => {
    axios.get('http://localhost:5000/visualizarPalavras', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        })
          .then((res) => res.data)
          .then((data) => {
            setDados(data)
          })
    }


  const handleMutationDelete =  async() =>{
    try {
       await axios({
        url: `http://localhost:5000/deletarPalavra/${userId}`,
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
        toast.success("Palavra excluida com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
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
      console.log({
        type: "error",
        message: "An error ocurred. Please, try again.",
      });
    };
  }
    useEffect(() => {
      if (data) {
        setUserId(data.id)
        setFormValues({
          word_portugues: data.word_portugues || formValues.word_portugues,
          translation_Waiwai: data.translation_Waiwai || formValues.translation_Waiwai,
          category: data.category || formValues.category,
          meaning_Portuguese: data.meaning_Portuguese || formValues.meaning_Portuguese,
          meaningWaiwai: data.meaningWaiwai || formValues.meaningWaiwai,
          synonymPortugues: data.synonymPortugues || formValues.synonymPortugues,
          synonymWaiwai: data.synonymWaiwai || formValues.synonymWaiwai,
        });
      }
    }, [data, formValues.category, formValues.meaningWaiwai, formValues.meaning_Portuguese, formValues.synonymPortugues, formValues.synonymWaiwai, formValues.translation_Waiwai, formValues.word_portugues])

    return (
      <Container>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Formik
                  initialValues={{
                    word_portugues: formValues.word_portugues,
                    translation_Waiwai: formValues.translation_Waiwai,
                    category: formValues.category,
                    meaning_Portuguese: formValues.meaning_Portuguese,
                    meaningWaiwai: formValues.meaningWaiwai,
                    synonymPortugues: formValues.synonymPortugues,
                    synonymWaiwai: formValues.synonymWaiwai,
                  }}
                  validationSchema={validationSchema}
                  enableReinitialize
                  onSubmit={async (fields) => {
                    let response;
                    try {
                      setIsLoading(true);
                      console.log(JSON.stringify(fields))
                      response = await axios({
                        url: `http://localhost:5000/atualizarPalavra/${userId}`,
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        data: JSON.stringify(fields),
                      });
                      if (response.status === 200) {
                        toast.success("Palavra atualizada com sucesso!", {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: true,
                          progress: undefined,
                        });
                      }
                      setModal(!modal)
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
                      console.log({
                        type: "error",
                        message: "An error ocurred. Please, try again.",
                      });

                    }
                    fetchDados()
                    setIsLoading(false);
                  }}
                  render={({ errors, touched, setFieldValue }) => (
                    <Form>
                      <Row>
                        <FormGroup className="w-50 pr-3">
                          <Label htmlFor="word_portugues">Palavra em português</Label>
                          <Field
                            name="word_portugues"
                            type="text"
                            onChange={(e) => {
                              setFieldValue("word_portugues", e.target.value, true)
                            }}
                            className={`form-control ${errors.word_portugues && touched.word_portugues
                              ? " is-invalid"
                              : ""
                              }`}
                          />
                          <ErrorMessage
                            name="word_portugues"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>

                        <FormGroup className="w-50">
                          <Label htmlFor="translation_Waiwai">Tradução em Waiwai</Label>
                          <Field
                            name="translation_Waiwai"
                            type="text"
                            className={`form-control ${errors.translation_Waiwai && touched.translation_Waiwai
                              ? " is-invalid"
                              : ""
                              }`}
                          />
                          <ErrorMessage
                            name="translation_Waiwai"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>
                      </Row>

                      <Row>
                        <FormGroup className="w-50 pr-3">
                          <Label htmlFor="meaning_Portuguese">Significado em português</Label>
                          <Field
                            name="meaning_Portuguese"
                            type="text"
                            className={`form-control ${errors.meaning_Portuguese && touched.meaning_Portuguese
                              ? " is-invalid"
                              : ""
                              }`}
                          />
                          <ErrorMessage
                            name="meaning_Portuguese"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>

                        <FormGroup className="w-50">
                          <Label htmlFor="meaningWaiwai">Significado em Waiwai</Label>
                          <Field
                            name="meaningWaiwai"
                            type="text"
                            className={`form-control ${errors.meaningWaiwai && touched.meaningWaiwai
                              ? " is-invalid"
                              : ""
                              }`}
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
                          <Label htmlFor="synonymPortugues">Sinonimo em Portugues</Label>
                          <Field
                            name="synonymPortugues"
                            type="text"
                            className={`form-control ${errors.synonymPortugues && touched.synonymPortugues
                              ? " is-invalid"
                              : ""
                              }`}
                          />
                          <ErrorMessage
                            name="synonymPortugues"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>

                        <FormGroup className="w-50">
                          <Label htmlFor="synonymWaiwai">Sinonimo Waiwai</Label>
                          <Field
                            name="synonymWaiwai"
                            type="text"
                            className={`form-control ${errors.synonymWaiwai && touched.synonymWaiwai
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
                        <FormGroup className="w-50 pr-3">
                          <Label htmlFor="category">Categoria da palavra</Label>
                          <Field
                            name="category"
                            type="text"
                            className={`form-control ${errors.category && touched.category
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

                      <Row className="mt-3">
                        <FormGroup className="w-100">
                          <div className="d-flex justify-content-between">
                            <Button type="submit" color="primary" disabled={isLoading}>
                              Enviar
                            </Button>
                            <Button color='danger' onClick={() => handleDeleteWord()}>
                              Excluir
                            </Button>
                          </div>
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
    )
  }

  export default FormWord;