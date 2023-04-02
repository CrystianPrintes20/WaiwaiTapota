import React, { useState } from "react";
import Link from "next/link";
import { Container, Row, Col, Button } from "reactstrap";
import Image from "next/image";
import bannerimg from "../../assets/aplicativoTapota/icones-logo-tapota/logoTipoBranco.png";

const Banner2 = () => {
  return (
    <div className="static-slider-head banner2">
      <Container>
        <Row className="">
          <Col lg="6" md="6" className="align-self-center">
            <h1 className="title">
              Dicionário Wai Wai: tradução, conhecimento e interculturalidade
            </h1>
            <h5 className="subtitle font-light">
              Venha conhecer e aprender palavras, termos e conceitos da língua
              indígena Wai Wai.<br/> O aplicativo foi pensado para facilitar a
              comunicação do aluno indígena no estudo de assuntos técnicos de
              sua área de estudo, e na preparação de material de aula pelo
              professor.
            </h5>
            <a
              href="https://drive.google.com/drive/folders/1B51A-b1nJ2z0fYYGPTiCAuO88XIGExjZ?usp=sharing"
              className="btn btn-danger m-r-20 btn-md m-t-30"
            >
              Baixe aqui o App dic. Wai Wai
            </a>

            {/* <Link href="/#coming">
              <a className="btn btn-md m-t-30  btn-outline-light ">
                Upgrade To Pro
              </a>
            </Link> */}
          </Col>
          <Col lg="6" md="6" className="py-4">
            <Image src={bannerimg} alt="hero banner" width={450} height={450} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner2;
