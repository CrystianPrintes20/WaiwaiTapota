/* eslint-disable */
import React from "react";
import { Row, Col, Container } from "reactstrap";
import Carousel from "react-grid-carousel";

const TeamComponent = () => {
  return (
    <div>
      <div className="spacer bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" className="text-center">
              <h1 className="title font-bold">Colaboradores</h1>
              <h6 className="subtitle">
                Nosso time de desenvolvimento é formado por profissionais
                experientes e dedicados que se esforçam para trazer as melhores
                soluções de software para nossos clientes.
              </h6>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="spacer team2 bg-bodycolorSecundary">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" className="text-center">
              <h2 className="title">Colaboradores & Time de desenvolvimento</h2>
              <h6 className="subtitle">
                Descreva sobre a equipe por tras desse projeto.
              </h6>
            </Col>
          </Row>
          <Row className="m-t-30">
            
            <Carousel cols={4} rows={1} gap={4} loop  >
                
              <Carousel.Item style="
    grid-template-columns: repeat(4, 50%);
">
                <Col lg="12" md="6" className="m-b-30">
                  <Row className="no-gutters">
                    <Col md="12" className="pro-pic t1" width={"auto"}>
                      <div className="card-img-overlay">
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fa fa-facebook"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fa fa-twitter"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fa fa-instagram"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="p-t-10">
                        <h5 className="title font-medium">Coloborador 01</h5>
                        <h6 className="subtitle">Especialidade em ...</h6>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Carousel.Item>
              <Carousel.Item>
                <Col className="m-b-30">
                  <Row className="no-gutters">
                    <Col md="12" className="col-md-12 pro-pic t2">
                      <div className="card-img-overlay">
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fa fa-facebook"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fa fa-twitter"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fa fa-instagram"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="p-t-10">
                        <h5 className="title font-medium">Coloborador 02</h5>
                        <h6 className="subtitle">Especialidade em ...</h6>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Carousel.Item>

              <Carousel.Item>
                <Col className="m-b-30">
                  <Row className="no-gutters">
                    <Col md="12" className="col-md-12 pro-pic t3">
                      <div className="card-img-overlay">
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fa fa-facebook"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fa fa-twitter"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fa fa-instagram"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="p-t-10">
                        <h5 className="title font-medium">Coloborador 03</h5>
                        <h6 className="subtitle">Especialidade em ...</h6>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Carousel.Item>
              <Carousel.Item>
                <Col className="m-b-30">
                  <Row className="no-gutters">
                    <Col md="12" className="col-md-12 pro-pic t4">
                      <div className="card-img-overlay">
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fa fa-facebook"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fa fa-twitter"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fa fa-instagram"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="p-t-10">
                        <h5 className="title font-medium">Coloborador 04</h5>
                        <h6 className="subtitle">Especialidade em ...</h6>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Carousel.Item>
              <Carousel.Item>
                <Col className="m-b-30">
                  <Row className="no-gutters">
                    <Col md="12" className="col-md-12 pro-pic t4">
                      <div className="card-img-overlay">
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fa fa-facebook"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fa fa-twitter"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fa fa-instagram"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="p-t-10">
                        <h5 className="title font-medium">Coloborador 04</h5>
                        <h6 className="subtitle">Especialidade em ...</h6>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Carousel.Item>

              <Carousel.Item>
                <Col className="m-b-30">
                  <Row className="no-gutters">
                    <Col md="12" className="col-md-12 pro-pic t4">
                      <div className="card-img-overlay">
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fa fa-facebook"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fa fa-twitter"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fa fa-instagram"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="p-t-10">
                        <h5 className="title font-medium">Coloborador 04</h5>
                        <h6 className="subtitle">Especialidade em ...</h6>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Carousel.Item>
            </Carousel>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default TeamComponent;
