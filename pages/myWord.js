import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TableWords from "../src/components/table/TableWords";
import Layout from "../src/layout/Layout";
import Banner3 from "../src/components/banner/Banner3";
import {
    Button,
    Label,
    FormGroup,
    Container,
    Row,
    Col,
    Card,
    CardBody,
} from "reactstrap";

export default function MyWords() {

    return (
        <Layout>
            <Banner3 />
            <Card>
                <CardBody>
                    <TableWords />
                </CardBody>
            </Card>
        </Layout>
    )

}
