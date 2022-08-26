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
                </Col>
            </Row>
            <Row className="m-t-40">
            <Col sm="8">
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
                                            First Name
                                        </th>
                                        <th>
                                            Last Name
                                        </th>
                                        <th>
                                            Username
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">
                                            1
                                        </th>
                                        <td>
                                            Mark
                                        </td>
                                        <td>
                                            Otto
                                        </td>
                                        <td>
                                            @mdo
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            2
                                        </th>
                                        <td>
                                            Jacob
                                        </td>
                                        <td>
                                            Thornton
                                        </td>
                                        <td>
                                            @fat
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            3
                                        </th>
                                        <td>
                                            Larry
                                        </td>
                                        <td>
                                            the Bird
                                        </td>
                                        <td>
                                            @twitter
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

