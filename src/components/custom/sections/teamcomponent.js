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
import Carousel from "react-grid-carousel";
import styled from "styled-components";

const ArrowBtn = styled.span`
  display: inline-block;
  position: absolute;
  top: 50%;
  right: ${({ type }) => (type === "right" ? "-20px" : "unset")};
  left: ${({ type }) => (type === "left" ? "-40px" : "unset")};
  width: 45px;
  height: 45px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: ${({ type }) =>
      type === "right"
        ? "translate(-75%, -50%) rotate(45deg)"
        : "translate(-25%, -50%) rotate(-135deg)"};
    width: 10px;
    height: 10px;
    border-top: 2px solid #666;
    border-right: 2px solid #666;
  }
  &:hover::after {
    border-color: #333;
  }
`;

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
            <Carousel
              cols={4}
              rows={1}
              gap={2}
              responsiveLayout={[
                {
                  breakpoint: 1200,
                  cols: 3,
                },
                {
                  breakpoint: 992,
                  cols: 2,
                },

              ]}
              mobileBreakpoint={670}
              arrowRight={<ArrowBtn type="right" />}
              arrowLeft={<ArrowBtn type="left" />}
            >
              <Carousel.Item style="grid-template-columns: repeat(4, 50%);">
                <Card>
                  <CardBody>
                    <img
                      alt="Sample"
                      src="./team1.png"
                      width={160}
                      height={150}
                      className="mb-2"
                    />
                    <CardTitle tag="h5">Crystian Printes</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Desenvolvedor Frontend React
                    </CardSubtitle>
                   {/*  <CardText>
                      Possuo conhecimento em programação, principalmente focado
                      no desenvolvimento frontend de aplicações web. Possuo
                      habilidades com as linguagens de programação PHP e
                      JavaScript, além de HTML5, CSS3, AJAX, Jquery, CURL,
                      Nodejs, React, Nextjs e conhecimento em POO e MVC.
                    </CardText> */}
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
              </Carousel.Item>

              <Carousel.Item>
                <Card>
                  <CardBody>
                    <img
                      alt="Sample"
                      src="./team2.jpg"
                      width={150}
                      height={150}
                      className="mb-2"
                    />
                    <CardTitle tag="h5">Marcos V. de Castro Printes</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Desenvolvedor Mobile
                    </CardSubtitle>
                    {/* <CardText >
                      Sou um desenvolvedor de aplicações mobile tenho
                      experiência com Java, C#, python e Flutter.
                    </CardText> */}
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
              </Carousel.Item>

              <Carousel.Item>
                <Card>
                  <CardBody>
                    <img
                      alt="Sample"
                      src="./team3.jpeg"
                      width={150}
                      height={150}
                      className="mb-2"
                    />
                    <CardTitle tag="h5">Debora marciao dos santos</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Designer Gráfico
                    </CardSubtitle>
                 {/*    <CardText>
                      Artista visual, formade em Arqueologia pela Universidade
                      Federal do Oeste do Pará (UFOPA). Atualmente é estudante
                      de Design Gráfico na EBAC. Atua na MALUNGU-PA como
                      designer e ilustradora, coordena o projeto Estúdio Taberna
                      e trabalha diretamente com ...{" "}
                      {/* Monhangarypi Produções.
                    </CardText> */}
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
              </Carousel.Item>

              <Carousel.Item>
                <Card>
                  <CardBody>
                    <img
                      alt="Sample"
                      src="./team4.jpg"
                      width={150}
                      height={150}
                      className="mb-2"
                    />
                    <CardTitle tag="h5">Camila Pereira Jácome</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Pesquisadora
                    </CardSubtitle>
                    {/* <CardText >
                      Doutora em Arqueologia pelo Museu de Arqueologia e
                      Etnologia da USP, com tese sobre encontros ontologicos
                      entre a arqueologia e culturas indígenas na região do Rio
                      Trombetas, Oriximiná, Pará. Participa desde 1999 como
                      colaboradora de pesquisas do Setor de Arqueologia ...
                      {/*  do Museu de História Natural e Jardim Botânico da
                          Universidade Federal de Minas Gerais. Professora
                          Adjunta no curso de Bacharelado em Arqueologia da
                          Universidade Federal do Oeste do Pará (UFOPA). Tem
                          experiência na área de Arqueologia Pré-colonial, com
                          ênfase em tecnologia cerâmica, mas também tem formação
                          em análise de arte rupestre e tecnologia lítica.
                          Publicação e interesse sobre educação, arqueologias
                          descolonais, arqueologia de gênero e feminismo.
                    </CardText> */}
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
              </Carousel.Item>

              <Carousel.Item>
                <Card>
                  <CardBody>
                    <img
                      alt="Sample"
                      src="./team5.jpg"
                      width={150}
                      className="mb-2"
                    />

                    <CardTitle tag="h5">Flávia Pessoa Monteiro</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Gerente e Projetista de Software
                    </CardSubtitle>
                   {/*  <CardText >
                      Atualmente Professora do curso de bacharelado em Sistemas
                      de Informação na Universidade Federal do Oeste do Pará
                      (UFOPA), lotada no campus de Oriximiná, bem no coração da
                      Amazônia. Doutora em Engenharia Elétrica na área de
                      Sistemas de Energia pela ...
                      {/* Universidade Federal do Pará no Programa de
                          Pós-Graduação em Engenharia Elétrica - PPGEE, em 2019.
                          Mestre em Engenharia Elétrica com área de concentração
                          em Computação Aplicada com linha de pesquisa em
                          Inteligência Computacional. Bacharel em Engenharia da
                          Computação pelo Instituto de Ensino Superior da
                          Amazônia (IESAM) no ano de 2014. Atua nas seguintes
                          linhas: computação aplicada a sistemas de energia,
                          tecnologias sociais, Data Science e aprendizagem de
                          máquina. 
                    </CardText> */}
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
              </Carousel.Item>

              <Carousel.Item>
                <Card>
                  <CardBody>
                    <img
                      alt="Sample"
                      src="./team6.jpg"
                      width={150}
                      className="mb-2"
                    />

                    <CardTitle tag="h5">Dávia Marciana Talgatti</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Pesquisadora
                    </CardSubtitle>
                 {/*    <CardText>
                      Possui graduação em Ciências Biológicas pela Universidade
                      Federal de Pelotas (2006), mestrado em Biologia Vegetal
                      pela Universidade Federal de Santa Catarina (2009),
                      doutorado em Botânica pela Universidade Federal do Rio
                      Grande do Sul (2014) e pós- ...
                      doutorado em Sociedade,
                      Natureza e Desenvolvimento
                         pela Universidade Federal do Oeste do Pará
                          (2015-2017). Tem experiência na área de Botânica, com
                          ênfase em Botânica criptogâmica, atuando
                          principalmente nos seguintes temas: perifíton,
                          fitoplâncton, microfitobentos, taxonomia, organismos
                          bioindicadores da qualidade e condições ambientais de
                          ecossistemas aquáticos, e ecologia de microalgas e
                          cianobactérias. Atualmente é Professora Adjunta na
                          área de Botânica, do curso de Ciências Biológicas do
                          Campus de Oriximiná da Universidade Federal do Oeste
                          do Pará e integra, como membro permanente, o PPG
                          Biociências da mesma Universidade, onde é orientadora
                          de mestrado. Ministra disciplinas de taxonomia,
                          ecologia e fisiologia de algas e plantas amazônicas,
                          atua orientando estudos que versam sobre a relação de
                          algas, cianobactérias, plantas aquáticas e terrestres
                          com as condições ambientais do meio que estão
                          inseridas, levantamentos florísticos e ecologia de
                          comunidades.{" "}
                    </CardText> */}
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
                {/* <Col className="m-b-30">
                  <Row className="no-gutters">
                    <Col md="12" className="col-md-12 pro-pic t6">
                      <div className="card-img-overlay">
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <a
                              href="http://lattes.cnpq.br/3712448942978626"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-linkedin"></i>
                            </a>
                          </li>

                          <li className="list-inline-item">
                            <a href="mailto:daviatalgatti@gmail.com">
                              <i className="fa fa-envelope"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="p-t-10">
                        <h5 className="title font-medium">
                          Dávia Marciana Talgatti
                        </h5>
                        <h6 className="subtitle">
                          Possui graduação em Ciências Biológicas pela
                          Universidade Federal de Pelotas (2006), mestrado em
                          Biologia Vegetal pela Universidade Federal de Santa
                          Catarina (2009), doutorado em Botânica pela
                          Universidade Federal do Rio Grande do Sul (2014) e
                          pós-doutorado em Sociedade, Natureza e Desenvolvimento
                          ...
                          pela Universidade Federal do Oeste do Pará
                          (2015-2017). Tem experiência na área de Botânica, com
                          ênfase em Botânica criptogâmica, atuando
                          principalmente nos seguintes temas: perifíton,
                          fitoplâncton, microfitobentos, taxonomia, organismos
                          bioindicadores da qualidade e condições ambientais de
                          ecossistemas aquáticos, e ecologia de microalgas e
                          cianobactérias. Atualmente é Professora Adjunta na
                          área de Botânica, do curso de Ciências Biológicas do
                          Campus de Oriximiná da Universidade Federal do Oeste
                          do Pará e integra, como membro permanente, o PPG
                          Biociências da mesma Universidade, onde é orientadora
                          de mestrado. Ministra disciplinas de taxonomia,
                          ecologia e fisiologia de algas e plantas amazônicas,
                          atua orientando estudos que versam sobre a relação de
                          algas, cianobactérias, plantas aquáticas e terrestres
                          com as condições ambientais do meio que estão
                          inseridas, levantamentos florísticos e ecologia de
                          comunidades.{" "}
                        </h6>
                      </div>
                    </Col>
                  </Row>
                </Col> */}
              </Carousel.Item>
            </Carousel>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default TeamComponent;
