/* eslint-disable */
import React from "react";
import { Row, Col, Container, Card, CardBody } from "reactstrap";
import Image from "next/image";
import img1 from "../../../assets/images/features/feature13/img1.jpg";
import img2 from "../../../assets/images/features/feature13/img2.jpg";
import img3 from "../../../assets/images/features/feature13/img3.jpg";
import img4 from "../../../assets/images/features/feature13/img4.jpg";
import img5 from "../../../assets/images/features/feature30/feature-img.jpg";

const FeatureComponent = () => {
  return (
    <div className="bg-bodycolorSecundary">
      <div className="spacer bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col md="auto" className="text-center">
              <span className="label label-danger label-rounded">
                Sobre o projeto Dicionário Waiwai
              </span>
              <h2 className="title mb-4">
                Quais são as motivações para criação do Projeto?
              </h2>
              <h6
                className="text-justify subtitle"
                style={{ lineHeight: "2rem" }}
              >
                Os povos indígenas falantes da língua wai wai (Fock, 1963),
                grupo étnico que agrupa diferentes etnias do norte do Pará e
                Leste de Roraima, são atendidos pelas políticas de ações
                afirmativas da Ufopa, e frequentam diferentes cursos dentro da
                instituição (Jácome e Harayama, 2021).
                <br /> Foi observado a existência de uma barreira linguística
                que compromete o seu desenvolvimento ideal dentro da
                instituição, que é resultado de um processo estrutural de
                carência de materiais formativos em língua wai wai-português,
                assim como na ausência de pesquisas que compreendam as
                especificidades linguísticas desse grupo no processo de
                escolarização em contextos não indígenas.
                <br /> O projeto “Wai Wai Tapota: tradução, conhecimento e
                interculturalidade” vem com o objetivo central de atuar no
                combate a essa “barreira”, por meio da verificação de temas e
                conceitos cuja tradução necessitem de mediação ou reflexão
                epistemológica, para a composição de uma base de dados e a
                criação de um dicionário wai wai.
              </h6>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="mt-5 feature4">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" className="text-center mt-0">
              <span className="label label-warning label-rounded">Objetivos</span>
              <h2 className="title">Objetivos e Metas</h2>
            </Col>
          </Row>
          <Row className="m-t-10">
            <Col md="4" className="wrap-feature4-box">
              <Card>
                <CardBody>
                  <div className="icon-round bg-light-info">
                    <i className="fa fa-commenting"></i>
                  </div>
                  <p className="m-t-20 text-justify">
                    Possibilitar a discussão sobre o processo de documentação,
                    revitalização e tradução entre o wai wai e português na
                    forma coloquial, culta e técnico-científica
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md="4" className="wrap-feature4-box">
              <Card>
                <CardBody>
                  <div className="icon-round bg-light-info">
                    <i className="fa fa-graduation-cap"></i>
                  </div>
                  <p className="m-t-20 text-justify">
                    Capacitar estudantes dentro da universidade em um processo
                    reflexivo e crítico do processo de documentação linguística,
                    tradução e aprendizagem em contexto intercultural
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md="4" className="wrap-feature4-box">
              <Card>
                <CardBody>
                  <div className="icon-round bg-light-info">
                    <i className="fa fa-comments-o"></i>
                  </div>
                  <p className="m-t-20 text-justify">
                    Socializar com a educação fundamental e sociedade em geral
                    materiais que reflitam as traduções e interfaces entre a
                    língua wai wai e o português.
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="bg-light spacer feature20 up">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" className="text-center">
              <span className="label label-info label-rounded">Produtos</span>
              <h2 className="title">Principais Produções e Produtos</h2>
            </Col>
          </Row>
          <Row className="wrap-feature-20">
            <Col lg="6" className="mb-3">
              <Card>
                <Row>
                  <Col md="12">
                    <CardBody className="d-flex no-block">
                      <div className="m-r-20">
                        <i
                          className="fa fa-lightbulb-o fa-lg"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div>
                        <h5 className="font-medium">
                          Investigar as especificidades na tradução do wai wai -
                          português e português - wai wai a partir da literatura
                          específica sobre tradução de línguas do tronco karib;
                        </h5>
                      </div>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col lg="6">
              <Card>
                <Row>
                  <Col md="12">
                    <CardBody className="d-flex no-block">
                      <div className="m-r-20">
                        <i
                          className="fa fa-pencil-square-o fa-lg"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div>
                        <h5 className="font-medium">
                          Produzir material bilíngue para promover a
                          interculturalidade e conhecimento indígena no ensino
                          básico nas cidades de Santarém e Oriximiná;
                        </h5>
                      </div>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col lg="6">
              <Card>
                <Row>
                  <Col md="12">
                    <CardBody className="d-flex no-block">
                      <div className="m-r-20">
                        <i
                          className="fa fa-pencil-square-o fa-lg"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div>
                        <h5 className="font-medium">
                          Produzir material bilíngue para disciplinas e/ou temas
                          de interesse aos acadêmicos indígenas da Ufopa;
                        </h5>
                      </div>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col lg="6">
              <Card>
                <Row>
                  <Col md="12">
                    <CardBody className="d-flex no-block">
                      <div className="m-r-20">
                        <i className="fa fa-code fa-lg" aria-hidden="true"></i>
                      </div>
                      <div>
                        <h5 className="font-medium">
                          Desenvolver tecnologia de produção de dicionário
                          bilíngue.
                        </h5>
                      </div>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {/*    <div className="spacer ">
        <Container className="feature30">
          <Row>
            <Col lg="10">
              <Image
                src={img5}
                className="rounded img-responsive"
                alt="wrappixel"
              />
            </Col>
            <Col lg="5" md="7" className="text-center wrap-feature30-box">
              <Card className="card-shadow">
                <CardBody>
                  <div className="p-20">
                    <span className="label label-info label-rounded">
                      Feature 3
                    </span>
                    <h3 className="title">
                      The New way of Making Your Website in mins
                    </h3>
                    <p>
                      You can relay on our amazing features list and also our
                      customer services will be great experience. You will love
                      it for sure.
                    </p>
                    <a
                      className="btn btn-danger btn-md btn-arrow m-t-20"
                      href="#"
                    >
                      <span>
                        Explore More <i className="ti-arrow-right"></i>
                      </span>
                    </a>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>  */}
    </div>
  );
};

export default FeatureComponent;
