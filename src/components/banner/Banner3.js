import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "reactstrap";
import Image from "next/image";
import bannerimg from "../../assets/images/landingpage/banner-img.png";

const Banner3 = () => {
    return (
        <div className="static-slider-head-banner3">
            <Container>
                <Row className="">
                    {/* <Col lg="6" md="6">
                        <Image src={bannerimg} alt="hero banner" /> 
                        <img src="http://via.placeholder.com/500x400"></img>
                    </Col> */}
                    {/* <Col lg="6" md="6" className="align-self-center">
                        <h1 className="title">
                            Vamos nos Cadastrar?
                        </h1>
                        <h4 className="subtitle font-light">
                            Preencha as informações abaixo para realizar o seu cadastro!
                        </h4>
                
                    </Col>
 */}
                </Row>
            </Container>
        </div>
    );
};

export default Banner3;
