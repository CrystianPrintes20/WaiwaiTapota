import React from "react";
import { Container, Row, Col, Table, Button } from "reactstrap";

const TableWords = () => {
  return (
    <div>
      <div className="" id="table-component">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" className="text-center">
              <h1 className="title font-bold">Suas palavras</h1>
              <h6 className="subtitle">
                Aqui estão listadas todas as palavras cadastradas por você caro
                usuário.

                Cosumir a API:
                registro, login, cadastrar as palavras, editar e deletar
                tenho que mostrar todas as palavras cadastradas
                Criar uma aba "Listar todas as palavras cadastradas"
              </h6>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md="12">
            <div className="table-responsive">
              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Palavra em Portugês</th>
                    <th>Tradução Waiwai</th>
                    <th>Descrição</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Deshmukh</td>
                    <td>Prohaska</td>
                    <td>
                      is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an m Genelia
                    </td>
                    <td>
                      <Button className="mx- 2" color="danger">Excluir</Button>
                      <Button color="primary">Click Me</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Deshmukh</td>
                    <td>Gaylord</td>
                    <td>
                      is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an m Ritesh
                    </td>
                    <td>
                      <span className="label label-info">Na fila</span>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Sanghani</td>
                    <td>Gusikowski</td>
                    <td>
                      is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an m Govinda
                    </td>
                    <td>
                      <span className="label label-warning">Analisando</span>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Roshan</td>
                    <td>Rogahn</td>
                    <td>
                      is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an m Hritik
                    </td>
                    <td>
                      <span className="label label-success">Aceito</span>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Joshi</td>
                    <td>Hickle</td>
                    <td>
                      is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an m Maruti
                    </td>
                    <td>
                      <span className="label label-info">Na fila</span>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Nigam</td>
                    <td>Eichmann</td>
                    <td>
                      is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an m Sonu
                    </td>
                    <td>
                      <span className="label label-success">Aceito</span>{" "}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TableWords;
