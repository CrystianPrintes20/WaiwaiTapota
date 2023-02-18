import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
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
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import AuthLogo from "../../src/assets/aplicativoTapota/icones-logo-tapota/tapotaIcone.png";;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginFormik = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const notify = () => toast("Wow so easy !");

  useEffect(() => {
    if (router.query.error) {
      setLoginError(router.query.error);
      setEmail(router.query.email);
    }
  }, [router]);
  /*    if (useSession) {
           if (router.query?.callbackUrl) {
               router.push(router.query.callbackUrl)
           } else {
               router.push('/')
           }
       } */
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  return (
    <Container fluid className="h-100" height="100vmax" style={{ backgroundColor: "#eef5f9" }}>
      <div className="d-flex justify-content-center">
        <Col sm="6" md="4">
          <div className="p-4 d-flex justify-content-center gap-2">
            <Link href="/">
              <a className="d-flex align-items-center gap-2">
                <Image src={AuthLogo} alt="authLogo" height={150} width={150} />
              </a>
            </Link>
          </div>

          <Card className="bg-white border border-success">
            <CardBody className="p-4 m-1">
              <h4 className="mb-0 fw-bold">Login</h4>
              <small className="pb-4 d-block">
                Ainda não tem uma conta?{" "}
                <Link href="/auth/registerformik"> Registrar</Link>
              </small>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (fields) => {
                  let email = fields.email;
                  let password = fields.password;
                  let response;
                  try {
                    setIsLoading(true);
                    response = await signIn("credentials", {
                      email,
                      password,
                      redirect: false,
                    });
                    if (response.status === 200) {
                      router.push(`${window.location.origin}/registerwords`);
                    } else if (response.status === 401) {
                      toast.error(
                        "Email ou senha incorretos! Verifique-os e tente novamente.",
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
                    }
                  } catch (e) {
                    if (response.status === 500 && response?.data?.message) {
                      console.log({
                        type: "error",
                        message: err.response.data.message,
                      });
                    } else {
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
                      <Label htmlFor="password">Password</Label>
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
                    <FormGroup className="form-check d-flex" inline>
                      <Label check>
                        <Input type="checkbox" />
                        Remember me
                      </Label>
                      <Link href="/auth/recoverpwd">
                        <a className="ms-auto text-decoration-none">
                          <small>Forgot password?</small>
                        </a>
                      </Link>
                    </FormGroup>
                    <FormGroup>
                      <Button
                        type="submit"
                        color="primary"
                        disabled={isLoading}
                      >
                        Login
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

export default LoginFormik;
