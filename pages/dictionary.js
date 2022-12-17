import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TableWords from "../src/components/table/TableWords";
import Layout from "../src/layout/Layout";
import Banner3 from "../src/components/banner/Banner3";
import Banner from "../src/components/banner/Banner";
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
import {useSession } from "next-auth/react";

export default function MyWords() {
    const { data: session } = useSession();
    
    if(session){
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
    }else{
        return (
            <>
              <Layout>
                <Banner/>
              </Layout>
            </>
          )
    }
  

}