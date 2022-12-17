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
import { ToastContainer, toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react"


const FormWord = ({ data }) => {
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
  }, [data])

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
                onSubmit={async (fields) => {
                  let response;
                  console.log(fields)
                  try {
                    setIsLoading(true);

                    response = await axios({
                      url: "http://localhost:5000/adicionarPalavra",
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      data: JSON.stringify(fields),
                    });
                    if (response.status === 200) {
                      toast.success("Nova palavra adicionada com sucesso!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                      });
                    }
                  } catch (err) {
                    if (
                      err?.response.status === 409 ?.message) {
                      toast.error("Email ou nome de usuario ja cadastrados! Verifique-os e tente novamente.", {
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
                render={({ errors, touched, setFieldValue }) => (
                  <Form>
                    <Row>
                      <FormGroup className="w-50 pr-3">
                        <Label htmlFor="word_portugues">Palavra em português</Label>
                        <Field
                          name="word_portugues"
                          type="text"
                          onChange={(e)=>{
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
                      <Button type="submit" color="primary"  disabled={isLoading}>
                          Enviar
                        </Button>
                        <Button color="danger" disabled={isLoading}>
                          Excluir
                        </Button>
                      </div>
                       
                      </FormGroup>

                    </Row>

                  </Form>
                )}
                enableReinitialize
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