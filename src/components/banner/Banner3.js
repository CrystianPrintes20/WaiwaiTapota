import React from "react";
import Link from "next/link";
import { Container, Row, Col, CardImg } from "reactstrap";
import Image from "next/image";
import bannerimg from "../../assets/aplicativoTapota/background/smartphone3.png";

const Banner3 = () => {
  return (
    <div className="static-slider-head-banner3">
      <Container>
        <Row className="">
          <Col lg="6" md="6" className="">
            <div className="d-flex justify-content-center align-items-center mt-5">
              <Image src={bannerimg} height={400} width={250} />
            </div>

            {/* <img src="../../assets/aplicativoTapota/background/smartphone2.png" class="img-fluid" alt="..." title="imag"/> */}
            <CardImg />
          </Col>
          <Col lg="6" md="6" className="align-self-center">
            <h1 className="title">Já instalou o nosso App?</h1>
            <h5 className="subtitle font-light">
              O dicionário Wai Wai irá facilitar a forma como você aprende
              português e wai wai. Com funcionalidades simples e uma interface
              intuitiva. Você está preparado para experimentar? Faça o download
              e junte-se à nossa comunidade
            </h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner3;
