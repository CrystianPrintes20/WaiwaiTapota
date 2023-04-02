/* eslint-disable */
import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer4 b-t spacer">
      <Container>
        <Row>
       {/*    <Col lg="4" md="6" className="m-b-30">
            <h5 className="m-b-20">Endereço</h5>
            <p>
              Universidade Federal do Oeste do Pará
              <br />
              Reitoria: Rua Vera Paz, s/n (Unidade Tapajós) Bairro Salé,
              Santarém, Pará, Brasil
            </p>
          </Col> */}
          <Col lg="4" md="6" className="m-b-30">
            <h5 className="m-b-20">Email</h5>
            <p>
              Office:
              <Link href="mailto:dicionariowaiwai@ufopa.edu.br">
                <a className="link"> dicionariowaiwai@ufopa.edu.br</a>
              </Link>
              <br />
              Site:
              <Link href="http://www.ufopa.edu.br/ufopa">
                <a className="link"> http://www.ufopa.edu.br/ufopa/</a>
              </Link>
            </p>
          </Col>
       {/*    <Col lg="4" md="6">
            <h5 className="m-b-20">Social</h5>
            <div className="round-social light">
              <Link href="#">
                <a className="link">
                  <i className="fa fa-facebook"></i>
                </a>
              </Link>
              <Link href="#">
                <a className="link">
                  <i className="fa fa-twitter"></i>
                </a>
              </Link>
              <Link href="#">
                <a className="link">
                  <i className="fa fa-google-plus"></i>
                </a>
              </Link>
              <Link href="#">
                <a className="link">
                  <i className="fa fa-youtube-play"></i>
                </a>
              </Link>
              <Link href="#">
                <a className="link">
                  <i className="fa fa-instagram"></i>
                </a>
              </Link>
            </div>
          </Col> */}
        </Row>
        <div className="f4-bottom-bar">
          <Row>
            <Col md="12">
              <div className="d-flex font-14">
                <div className="m-t-10 m-b-10 copyright">
                  Todos os Direitos reservados{" "}
                  <Link href="https://www.wrappixel.com">
                    <a className="link">UFOPA - CAMPUS ORIXIMINÁ</a>
                  </Link>
                </div>
                <div className="links ml-auto m-t-10 m-b-10">
                  <Link href="#">
                    <a className="p-10 p-l-0">Termos de uso</a>
                  </Link>
                  <Link href="#">
                    <a className="p-10">Direitos Legais</a>
                  </Link>
                  <Link href="#">
                    <a className="p-10">Politica de privacidade</a>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};
export default Footer;
