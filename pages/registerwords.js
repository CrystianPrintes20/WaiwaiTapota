import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {useSession } from "next-auth/react";
import Banner3 from "../src/components/banner/Banner3";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterWords() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  // useEffect(() => {
  //   if (!session?.user) {
  //     router.push('./')
  //   }
  // }, [router, session])

  const initialValues = {
    word_portugues: "",
    translation_Waiwai: "",
    category: "",
    meaning_Portuguese: "",
    meaningWaiwai: "",
    synonymPortugues: "",
    synonymWaiwai: "",
  };

  const validationSchema = Yup.object().shape({
    word_portugues: Yup.string().required("Este campo é obrigatorio."),
    translation_Waiwai: Yup.string().required("Este campo é obrigatorio."),
    category: Yup.string().required("Este campo é obrigatorio."),
    meaning_Portuguese: Yup.string().required("Este campo é obrigatorio."),
    meaningWaiwai: Yup.string().required("Este campo é obrigatorio."),
    synonymPortugues: Yup.string().required("Este campo é obrigatorio."),
    synonymWaiwai: Yup.string().required("Este campo é obrigatorio.")
  });


  if (session) {
    return (
      <>
        <Layout>
          <Banner3 />
          <Card className="feature4">
            <Container>
              <Row className="justify-content-center">
                <h2 className="title my-5">Contribua e melhore o Wai-Wai Translator!</h2>
              </Row>
              <Row>
                <Col sm="4">
                  <Card>
                    <img alt="Card" src="./tradutor.jpg" />
                    <CardBody>
                      <div className="h-u-text-left main__item--card__desc">
                        <p>
                          A sua colaboração é uma parte importante no processo
                          de inclusão de novas palavras no Wai-Wai Translator.
                          Se você fala ou conhece palavras na língua nativa
                          Wai-Wai e identificou que ela ainda não está
                          presente aqui, ajude-nos preenchendo o formulário ao
                          lado e adicionando elas ao nosso tradutor.
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="8">
                  <Card>
                    <CardBody>
                      <h4 className="mb-3 fw-bold">Cadastro de Palavras</h4>
                      <Formik
                        initialValues={initialValues}
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
                              err?.response.status === 409 || err?.response?.data?.message) {
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
                        render={({ errors, touched }) => (
                          <Form>
                            <Row>
                              <FormGroup className="w-50 pr-3">
                                <Label htmlFor="word_portugues">Palavra em português</Label>
                                <Field
                                  name="word_portugues"
                                  type="text"
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
                              <FormGroup>
                                <Button type="submit" color="primary" className="me-2" disabled={isLoading}>
                                  Enviar
                                </Button>
                                <Button type="reset" color="secondary" className="mx-3" disabled={isLoading}>
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
