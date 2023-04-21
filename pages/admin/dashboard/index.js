import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import bannerimg from "../../../src/assets/aplicativoTapota/icones-logo-tapota/tapotaIcone.png";
import Image from "next/image";

export default function WelcomePage(){
  return (
    <Container className="mt-5">
      <h1 className="text-center">Bem-vindo(a) ao Dashboard do Admin!</h1>
      <p className="text-center">Aqui você pode acessar diversas informações e ferramentas exclusivas.</p>
      <Row className="mt-5">
        <Col md={{ size: 4, offset: 4 }}>
          <Card>
            <CardBody>
            <Image src={bannerimg} alt="hero banner" width={450} height={450} />

            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

