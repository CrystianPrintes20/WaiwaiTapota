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
            <Image
              src={bannerimg}
              height={450}
              width={300}
            />
            </div>
            
            {/* <img src="../../assets/aplicativoTapota/background/smartphone2.png" class="img-fluid" alt="..." title="imag"/> */}
            <CardImg />
          </Col>
          <Col lg="6" md="6" className="align-self-center">
            <h1 className="title">Já instalou o nosso App?</h1>
            <h5 className="subtitle font-light">
              Conheça o aplicativo Dicionario Waiwai
              que vai revolucionar a forma como você se comunica com as pessoas
              o ao seu redor. Com funcionalidades simples e uma interface
              intuitiva, este aplicativo é a escolha perfeita para quem busca
              praticidade e eficiência em suas atividades de tradução da lingua
              martena Waiwai. Está pronto para experimentar-lo agora? Faça o
              download e junte-se à nossa comunidade!
            </h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner3;
