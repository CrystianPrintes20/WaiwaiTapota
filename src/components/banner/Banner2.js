import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "reactstrap";
import Image from "next/image";
import bannerimg from "../../assets/images/landingpage/banner-img.png";

const Banner2 = () => {
  return (
    <div className="static-slider-head banner2">
      <Container>
        <Row className="">
          <Col lg="6" md="6" className="align-self-center">
            <h1 className="title">
            What is Lorem Ipsum?
            </h1>
            <h4 className="subtitle font-light">
              FLorem Ipsum is simply dummy text of the printing and typesetting industry. 
              <br /> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </h4>
            <a
              href="https://wrappixel.com/templates/nextkit-nextjs-free-uikit"
              className="btn btn-danger m-r-20 btn-md m-t-30 "
            >
              Download Free
            </a>
            {/* <Link href="/#coming">
              <a className="btn btn-md m-t-30  btn-outline-light ">
                Upgrade To Pro
              </a>
            </Link> */}
          </Col>
          <Col lg="6" md="6">
            {/* <Image src={bannerimg} alt="hero banner" /> */}
            <img src="http://via.placeholder.com/514x510"></img>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner2;
