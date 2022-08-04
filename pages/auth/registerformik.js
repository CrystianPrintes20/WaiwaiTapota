import React from "react";
import RegisterformikAll from "../../src/components/auth/registerformik/RegisterformikAll"
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

import Link from "next/link";
import Image from "next/image";
//import AuthLogo from "../../src/layouts/logo/AuthLogo";
const RegisterFormik = () => {
  const initialValues = {
    UserName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  };

  const validationSchema = Yup.object().shape({
    UserName: Yup.string().required("UserName is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "Accept Terms & Conditions is required"
    ),
  });
  return (
    <div>
      <RegisterformikAll />
      <Container fluid className="h-100 py-5">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="6" className="loginContainer">
            {/* <AuthLogo /> */}
            <Card>
              <CardBody className="p-4 m-1">
                <h4 className="mb-0 fw-bold">Cadastro</h4>
                <small className="pb-4 d-block">
                  Já tem uma conta?{" "}
                  <Link href="/auth/loginformik">Login</Link>
                </small>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(fields) => {
                    // eslint-disable-next-line no-alert
                    alert(
                      `SUCCESS!! :-)\n\n${JSON.stringify(fields, null, 4)}`
                    );
                  }}
                  render={({ errors, touched }) => (
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
                        <Button type="submit" color="primary" className="me-2">
                          Cadastrar
                        </Button>
                        <Button type="reset" color="secondary" className= "mx-3">
                          Cancelar
                        </Button>
                      </FormGroup>
                    </Form>
                  )}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterFormik;