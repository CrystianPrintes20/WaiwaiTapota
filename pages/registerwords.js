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
    Input,
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";

export default function RegisterWords() {
    return (
        <Layout>
            <RegisterComponents />
            <div>
                <div className="spacer feature4">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="7" className="text-center">
                                <h2 className="title">Cadastre novas palavras!</h2>
                                <h6 className="subtitle">
                                    You can relay on our amazing features list and also our customer
                                    services will be great experience for you without doubt and in
                                    no-time
                                </h6>
                            </Col>
                        </Row>
                        <Row className="m-t-40">
                            <Col md="6" className="wrap-feature4-box">
                                <Card>
                                    <CardBody>
                                        <div className="icon-round bg-light-info">
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <h5 className="font-medium">Lorem ipsum</h5>
                                        <p className="m-t-20">
                                            You can relay on our amazing features list and also our
                                            customer services will be great experience. Lorem ipsum
                                            dolor sit amet, consectetur adipiscing elit. Praesent
                                            tristique pellentesque ipsum.
                                        </p>
                                        <a href="#" className="linking text-themecolor">
                                            Explore More<i className="ti-arrow-right"></i>
                                        </a>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="6" className="wrap-feature4-box">
                                <Card>
                                    <CardBody>
                                        <Form>
                                            <FormGroup>
                                                <Label htmlFor="firstName">Usuário</Label>
                                                <Field
                                                    name="UserName"
                                                    type="text"
                                                    className={`form-control ${errors.UserName && touched.UserName
                                                        ? " is-invalid"
                                                        : ""
                                                        }`}
                                                />
                                                <ErrorMessage
                                                    name="UserName"
                                                    component="div"
                                                    className="invalid-feedback"
                                                />
                                            </FormGroup>

                                            <FormGroup>
                                                <Label htmlFor="email">Email</Label>
                                                <Field
                                                    name="email"
                                                    type="text"
                                                    className={`form-control${errors.email && touched.email ? " is-invalid" : ""
                                                        }`}
                                                />
                                                <ErrorMessage
                                                    name="email"
                                                    component="div"
                                                    className="invalid-feedback"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="password">Senha</Label>
                                                <Field
                                                    name="password"
                                                    type="password"
                                                    className={`form-control${errors.password && touched.password
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
                                            <FormGroup>
                                                <Label htmlFor="confirmPassword">
                                                    Confirmar Senha
                                                </Label>
                                                <Field
                                                    name="confirmPassword"
                                                    type="password"
                                                    className={`form-control${errors.confirmPassword && touched.confirmPassword
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
                                            <FormGroup inline className="form-check">
                                                <Field
                                                    type="checkbox"
                                                    name="acceptTerms"
                                                    id="acceptTerms"
                                                    className={`form-check-input ${errors.acceptTerms && touched.acceptTerms
                                                        ? " is-invalid"
                                                        : ""
                                                        }`}
                                                />
                                                <Label
                                                    htmlFor="acceptTerms"
                                                    className="form-check-label"
                                                >
                                                    Aceitar Termos & Condições
                                                </Label>
                                                <ErrorMessage
                                                    name="acceptTerms"
                                                    component="div"
                                                    className="invalid-feedback"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Button type="submit" color="primary" className="me-2" disabled={isLoading}>
                                                    Cadastrar
                                                </Button>
                                                <Button type="reset" color="secondary" className="mx-3" disabled={isLoading}>
                                                    Cancelar
                                                </Button>
                                            </FormGroup>
                                        </Form>

                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </Layout>

    );
}