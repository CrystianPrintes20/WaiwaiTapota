import React, { useState } from "react";
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
import { registerSchema } from "../../src/schemas";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import AuthLogo from "../../src/assets/aplicativoTapota/icones-logo-tapota/tapotaIcone.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { registerSchema } from "../../src/schemas";

const RegisterFormik = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  };

  
  return (
    <Container
      fluid
      className="h-100 py-5"
      style={{ backgroundColor: "#eef5f9" }}
    >
      <div className="d-flex justify-content-center">
        <Col sm="6" md="4">
          <div className="p-4 d-flex justify-content-center gap-2">
            <Link href="/">
              <a className="d-flex align-items-center gap-2">
                <Image src={AuthLogo} alt="authLogo" height={150} width={150} />
              </a>
            </Link>
          </div>
          <Card className="border border-success">
            <CardBody className="p-4 m-1">
              <h4 className="mb-0 fw-bold">Cadastro</h4>
              <small className="pb-4 d-block">
                Já tem uma conta? <Link href="/auth/loginformik">Login</Link>
              </small>
              <Formik
                initialValues={initialValues}
                validationSchema={registerSchema}
                onSubmit={async (fields) => {
                  let response;
                  try {
                    setIsLoading(true);

                    response = await axios({
                      url: `${
                        process.env.NEXT_PUBLIC_API_URL ||
                        "https://waiwaitapota.homes"
                      }/auth/register`,
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      data: JSON.stringify(fields),
                    });
                    if (response.status === 201) {
                      /* sessionStorage.setItem("token", response.data.token);
                      router.push("/api/auth/signin"); */
                      router.push("./loginformik");
                    }
                  } catch (err) {
                    if (
                      err?.response.status === 409 ||
                      err?.response?.data?.message
                    ) {
                      toast.error(
                        "Email ou nome de usuario ja cadastrados! Verifique-os e tente novamente.",
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
                    <FormGroup>
                      <Label htmlFor="firstName">Usuário</Label>
                      <Field
                        name="username"
                        type="text"
                        className={`form-control ${
                          errors.username && touched.username
                            ? " is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="invalid-feedback"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="email">Email</Label>
                      <Field
                        name="email"
                        type="text"
                        className={`form-control${
                          errors.email && touched.email ? " is-invalid" : ""
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
                        className={`form-control${
                          errors.password && touched.password
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
                      <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                      <Field
                        name="confirmPassword"
                        type="password"
                        className={`form-control${
                          errors.confirmPassword && touched.confirmPassword
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
                        className={`form-check-input ${
                          errors.acceptTerms && touched.acceptTerms
                            ? " is-invalid"
                            : ""
                        }`}
                      />
                      <Label htmlFor="acceptTerms" className="form-check-label">
                        Aceitar Termos & Condições
                      </Label>
                      <ErrorMessage
                        name="acceptTerms"
                        component="div"
                        className="invalid-feedback"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Button
                        type="submit"
                        color="primary"
                        className="me-2"
                        disabled={isLoading}
                      >
                        Cadastrar
                      </Button>
                      <Button
                        type="reset"
                        color="secondary"
                        className="mx-3"
                        disabled={isLoading}
                      >
                        Cancelar
                      </Button>
                    </FormGroup>
                    <ToastContainer />
                  </Form>
                )}
              />
            </CardBody>
          </Card>
        </Col>
      </div>
    </Container>
  );
};

export default RegisterFormik;
