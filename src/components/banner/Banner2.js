import React, { useState } from "react";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import Image from "next/image";
import bannerimg from "../../assets/aplicativoTapota/icones-logo-tapota/logoTipoBranco.png";

const Banner2 = () => {
  return (
    <div className="static-slider-head banner2">
      <Container>
        <Row className="">
          <Col lg="6" md="6" className="align-self-center">
            <h1 className="title">Traduza e se comunique com praticidade</h1>
            <h4 className="subtitle font-light">
              Economize tempo com as suas traduções e concentre-se nas tarefas
              que realmente importam. <br />
              Com o WaiwaiTapota, você tem traduções da lingua indigena Waiwai
              para o portugues.
            </h4>
            <a href="https://drive.google.com/drive/folders/1B51A-b1nJ2z0fYYGPTiCAuO88XIGExjZ?usp=sharing" className="btn btn-danger m-r-20 btn-md m-t-30">
              Download App
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
