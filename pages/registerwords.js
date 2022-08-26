import Layout from "../src/layout/Layout";
import RegisterComponents from "../src/components/custom/Register-components";
import {
  Button,
  Label,
  FormGroup,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Input,
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Image from "next/image";
import { getSession, useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RegisterWords() {
  const router = useRouter();
  const { data: token, status } = useSession();
  console.log(token);
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
       
        <Layout>
            <RegisterComponents />
            <div>
                <div className="spacer feature4">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="7" className="text-center">
                                <h2 className="title">Melhore o Wai-Wai Translator!</h2>
                            </Col>
                        </Row>
                        <Row className="m-t-40">
                            <Col sm="6">
                                <Card>
                                    <img
                                        alt="Card"
                                        src="https://picsum.photos/400/175"
                                    />
                                    <CardBody>
                                        <div class="h-u-text-left main__item--card__desc">
                                            <p >A sua colaboração é uma parte importante no processo
                                                de inclusão de novas palavras no Wai-Wai Translator.
                                                Se você fala ou conhece palavras na língua nativa Wai-Wai e
                                                identificou que ela ainda não está presente aqui,
                                                ajude-nos preenchendo o formulário ao lado e adicionando elas ao nosso tradutor.</p>
                                        </div>
                                    </CardBody>

                                </Card>
                            </Col>
                            <Col sm="6">
                                <Card body>
                                    <h4 className="title">Cadastro de Palavras</h4>
                                    <Formik
                                        render={({ errors, touched }) => (
                                            <Form>
                                                <FormGroup>
                                                    <Label htmlFor="Name">Palavra</Label>
                                                    <Field
                                                        name="Name"
                                                        type="text"
                                                        className={`form-control ${errors.Name && touched.Name
                                                            ? " is-invalid"
                                                            : ""
                                                            }`}
                                                    />
                                                    <ErrorMessage
                                                        name="Name"
                                                        component="div"
                                                        className="invalid-feedback"
                                                    />
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label htmlFor="traducao">Tradução</Label>
                                                    <Field
                                                        name="traducao"
                                                        type="text"
                                                        className={`form-control${errors.traducao && touched.traducao ? " is-invalid" : ""
                                                            }`}
                                                    />
                                                    <ErrorMessage
                                                        name="traducao"
                                                        component="div"
                                                        className="invalid-feedback"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label htmlFor="descricao">Descrição</Label>
                                                    <Field
                                                        name="descricao"
                                                        type="text"
                                                        className={`form-control${errors.descricao && touched.descricao
                                                            ? " is-invalid"
                                                            : ""
                                                            }`}
                                                    />
                                                    <ErrorMessage
                                                        name="descricao"
                                                        component="div"
                                                        className="invalid-feedback"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Button type="submit" color="primary" >
                                                        Enviar
                                                    </Button>
                                                    <Button type="reset" color="secondary" >
                                                        Cancelar
                                                    </Button>
                                                </FormGroup>
                                            </Form>
                                        )}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </Layout>
        
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
  /*  useEffect(() => {
        console.log(loading, session)
		if(!loading && !session?.accessToken) {
			router.push('./auth/loginformik')
		}
	}, [loading, session])
 */
}
