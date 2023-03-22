import React from "react";
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

const TeamComponent = () => {
  return (
    <div>
      {/*     <div className="spacer bg-light">
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
      </div> */}
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
            <Container className="d-flex justify-content-center">
              <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <img
                        alt="Sample"
                        src="./team01.png"
                        width={160}
                        height={150}
                        className="mb-2"
                      />
                      <CardTitle tag="h5">Crystian Printes</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Desenvolvedor Frontend React
                      </CardSubtitle>
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <a
                            href="https://www.linkedin.com/in/crystian-printes-b052691b7/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>

                        <li className="list-inline-item">
                          <a href="mailto:crystianprintes.ufopa@gmail.com">
                            <i className="fa fa-envelope"></i>
                          </a>
                        </li>
                      </ul>
                    </CardBody>
                  </Card>
                </Col>

                <Col>
                  <Card>
                    <CardBody>
                      <img
                        alt="Sample"
                        src="./team02.png"
                        width={150}
                        height={150}
                        className="mb-2"
                      />
                      <CardTitle tag="h5">
                        Marcos V. de Castro Printes
                      </CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Desenvolvedor Mobile
                      </CardSubtitle>
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <a
                            href="https://br.linkedin.com/in/marcos-vinicius-de-castro-printes-b22442201"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>

                        <li className="list-inline-item">
                          <a href="mailto:mvprintes2@gmail.com">
                            <i className="fa fa-envelope"></i>
                          </a>
                        </li>
                      </ul>
                    </CardBody>
                  </Card>
                </Col>

                <Col>
                  <Card>
                    <CardBody>
                      <img
                        alt="Sample"
                        src="./team03.png"
                        width={150}
                        height={150}
                        className="mb-2"
                      />
                      <CardTitle tag="h5">Debora marciao dos santos</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Designer Gráfico
                      </CardSubtitle>
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <a
                            href="http://lattes.cnpq.br/1806104313800692"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>

                        <li className="list-inline-item">
                          <a href="mailto:debeokjin@gmail.com">
                            <i className="fa fa-envelope"></i>
                          </a>
                        </li>
                      </ul>
                    </CardBody>
                  </Card>
                </Col>

                <Col>
                  <Card>
                    <CardBody>
                      <img
                        alt="Sample"
                        src="./team04.png"
                        width={150}
                        height={150}
                        className="mb-2"
                      />
                      <CardTitle tag="h5">Camila Pereira Jácome</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Pesquisadora
                      </CardSubtitle>
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <a
                            href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4762839U8"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>

                        <li className="list-inline-item">
                          <a href="mailto:camilajacome88@gmail.com">
                            <i className="fa fa-envelope"></i>
                          </a>
                        </li>
                      </ul>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>

            <Container>
              <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <img
                        alt="Sample"
                        src="./team05.png"
                        width={150}
                        className="mb-2"
                      />

                      <CardTitle tag="h5">Flávia Pessoa Monteiro</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Gerente e Projetista de Software
                      </CardSubtitle>
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <a
                            href="http://lattes.cnpq.br/3434022917410660"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>

                        <li className="list-inline-item">
                          <a href="mailto:flavia.monteiro@ufopa.edu.br">
                            <i className="fa fa-envelope"></i>
                          </a>
                        </li>
                      </ul>
                    </CardBody>
                  </Card>
                </Col>

                <Col>
                  <Card>
                    <CardBody>
                      <img
                        alt="Sample"
                        src="./team06.png"
                        width={150}
                        className="mb-2"
                      />

                      <CardTitle tag="h5">Dávia Marciana Talgatti</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Pesquisadora
                      </CardSubtitle>
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <a
                            href="https://www.linkedin.com/in/crystian-printes-b052691b7/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>

                        <li className="list-inline-item">
                          <a href="mailto:crystianprintes.ufopa@gmail.com">
                            <i className="fa fa-envelope"></i>
                          </a>
                        </li>
                      </ul>
                    </CardBody>
                  </Card>
                </Col>

                <Col>
                  <Card>
                    <CardBody>
                      <img
                        alt="Sample"
                        src="./team07.png"
                        width={150}
                        className="mb-2"
                      />

                      <CardTitle tag="h5">Mazzile Tavares Rodrigues</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Designer Gráfico
                      </CardSubtitle>
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <a
                            href="http://lattes.cnpq.br/1803108295629145"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>

                        <li className="list-inline-item">
                          <a href="mailto:mazziletavaresrodrigues@gmail.com">
                            <i className="fa fa-envelope"></i>
                          </a>
                        </li>
                      </ul>
                    </CardBody>
                  </Card>
                </Col>

                <Col>
                  <Card>
                    <CardBody>
                      <img
                        alt="Sample"
                        src="./team08.png"
                        width={150}
                        className="mb-2"
                      />

                      <CardTitle tag="h5">Rui Harayama</CardTitle>
                      {/*  <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Designer Gráfico
                      </CardSubtitle>
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <a
                            href="http://lattes.cnpq.br/1803108295629145"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>

                        <li className="list-inline-item">
                          <a href="mailto:mazziletavaresrodrigues@gmail.com">
                            <i className="fa fa-envelope"></i>
                          </a>
                        </li>
                      </ul> */}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>

            <Container>
              <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <img
                        alt="Sample"
                        src="./team09.png"
                        width={150}
                        className="mb-2"
                      />

                      <CardTitle tag="h5">Carolina Wai Wai</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Equipe Interdisciplinar
                      </CardSubtitle>
                      {/* <ul className="list-inline">
                        <li className="list-inline-item">
                          <a
                            href="http://lattes.cnpq.br/3434022917410660"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>

                        <li className="list-inline-item">
                          <a href="mailto:flavia.monteiro@ufopa.edu.br">
                            <i className="fa fa-envelope"></i>
                          </a>
                        </li>
                      </ul> */}
                    </CardBody>
                  </Card>
                </Col>

                <Col>
                  <Card>
                    <CardBody>
                      <img
                        alt="Sample"
                        src="./team10.png"
                        width={150}
                        className="mb-2"
                      />

                      <CardTitle tag="h5">Elaíde Wai Wai</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Equipe Interdisciplinar
                      </CardSubtitle>
                      {/* <ul className="list-inline">
                        <li className="list-inline-item">
                          <a
                            href="https://www.linkedin.com/in/crystian-printes-b052691b7/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>

                        <li className="list-inline-item">
                          <a href="mailto:crystianprintes.ufopa@gmail.com">
                            <i className="fa fa-envelope"></i>
                          </a>
                        </li>
                      </ul> */}
                    </CardBody>
                  </Card>
                </Col>

                <Col>
                  <Card>
                    <CardBody>
                      <img
                        alt="Sample"
                        src="./team11.png"
                        width={150}
                        className="mb-2"
                      />

                      <CardTitle tag="h5">Ediane Santos</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Equipe Interdisciplinar
                      </CardSubtitle>
                      {/*     <ul className="list-inline">
                        <li className="list-inline-item">
                          <a
                            href="http://lattes.cnpq.br/1803108295629145"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>

                        <li className="list-inline-item">
                          <a href="mailto:mazziletavaresrodrigues@gmail.com">
                            <i className="fa fa-envelope"></i>
                          </a>
                        </li>
                      </ul> */}
                    </CardBody>
                  </Card>
                </Col>

                <Col>
                  <Card>
                    <CardBody>
                      <img
                        alt="Sample"
                        src="./team12.png"
                        width={150}
                        className="mb-2"
                      />

                      <CardTitle tag="h5">Izabelle Sena</CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Equipe Interdisciplinar
                      </CardSubtitle>
                      {/*<ul className="list-inline">
                        <li className="list-inline-item">
                          <a
                            href="http://lattes.cnpq.br/1803108295629145"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>

                        <li className="list-inline-item">
                          <a href="mailto:mazziletavaresrodrigues@gmail.com">
                            <i className="fa fa-envelope"></i>
                          </a>
                        </li>
                      </ul> */}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <img
                        alt="Sample"
                        src="./team13.png"
                        width={150}
                        className="mb-2"
                      />

                      <CardTitle tag="h5">Ronildo Wai Wai</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Equipe Interdisciplinar
                      </CardSubtitle>
                      {/* <ul className="list-inline">
                        <li className="list-inline-item">
                          <a
                            href="http://lattes.cnpq.br/3434022917410660"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>

                        <li className="list-inline-item">
                          <a href="mailto:flavia.monteiro@ufopa.edu.br">
                            <i className="fa fa-envelope"></i>
                          </a>
                        </li>
                      </ul> */}
                    </CardBody>
                  </Card>
                </Col>

                <Col>
                  <Card>
                    <CardBody>
                      <img
                        alt="Sample"
                        src="./team14.png"
                        width={150}
                        className="mb-2"
                      />

                      <CardTitle tag="h5">Terezinha Lira</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Equipe Interdisciplinar
                      </CardSubtitle>
                      {/* <ul className="list-inline">
                        <li className="list-inline-item">
                          <a
                            href="https://www.linkedin.com/in/crystian-printes-b052691b7/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>

                        <li className="list-inline-item">
                          <a href="mailto:crystianprintes.ufopa@gmail.com">
                            <i className="fa fa-envelope"></i>
                          </a>
                        </li>
                      </ul> */}
                    </CardBody>
                  </Card>
                </Col>

                
              </Row>
            </Container>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default TeamComponent;
