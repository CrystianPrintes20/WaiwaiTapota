import React from "react";
import Head from "next/head";
import LoginformikAll from "../../src/components/auth/loginformik/LoginformikAll"
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
//import AuthLogo from "../../src/layouts/logo/AuthLogo";

const LoginFormik = () => {
    const navigate = useRouter();

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
        <div>
            <Head/>
            <LoginformikAll />
                <Container fluid className="h-100" style={{ width: "390px" }}>
                    <Row className="justify-content-center align-items-center h-100">
                        <Col lg="12" className="loginContainer">
                            {/* <AuthLogo /> */}
                            <Card>
                                <CardBody className="p-4 m-1">
                                    <h4 className="mb-0 fw-bold">Login</h4>
                                    <small className="pb-4 d-block">
                                        Do not have an account?{" "}
                                        <Link href="/auth/registerformik">Sign up</Link>
                                    </small>
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={async (fields) => {
                                            await fetch("/api/auth/register");
                                        }}
                                        render={({ errors, touched }) => (
                                            <Form>
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
                                                    <Label htmlFor="password">Password</Label>
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
                                                    <Button type="submit" color="primary" className="me-2">
                                                        Login
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

export default LoginFormik;