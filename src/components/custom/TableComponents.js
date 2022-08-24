import React from "react";
import {
    Table,
    Card,
    CardBody,
    Col,
    Row
} from "reactstrap";


const TableComponents = () => {
    return (

        <>
            <Row className="justify-content-center">
                <Col md="7" className="text-center">
                    <h2 className="title">Palavras Cadastradas</h2>
                    <h6 class="subtitle">Confira abaixo todas as palavras que você já cadastrou!</h6>
                </Col>
            </Row>
            <Row className="justify-content-center m-t-30">

                <Col lg="8">
                    <Card>
                        <CardBody>
                            <div>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>
                                                #
                                            </th>
                                            <th>
                                                Palavra
                                            </th>
                                            <th>
                                                Tradução
                                            </th>
                                            <th>
                                                Descrição
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">
                                                1
                                            </th>
                                            <td>
                                                Avaré
                                            </td>
                                            <td>
                                                Homem amigo
                                            </td>
                                            <td>
                                                Pessoa querida e amigável
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                2
                                            </th>
                                            <td>
                                                Guaíba
                                            </td>
                                            <td>
                                                O ingaseiral
                                            </td>
                                            <td>
                                                Conjunto de árvores de Ingá
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                3
                                            </th>
                                            <td>
                                                Ita
                                            </td>
                                            <td>
                                                Pedra
                                            </td>
                                            <td>
                                                Ex: Itapeva, Itapema, Itatiaia
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>

                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </>
    );
};

export default TableComponents;

