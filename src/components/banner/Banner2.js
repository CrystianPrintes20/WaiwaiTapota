import React, { useState } from "react";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
} from "reactstrap";
import Image from "next/image";
import bannerimg from "../../assets/aplicativoTapota/icones-logo-tapota/logoTipoBranco.png";

const Banner2 = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="static-slider-head banner2">
      <Container>
        <Row className="">
          <Col lg="6" md="6" className="align-self-center">
            <h1 className="title">Traduza e se comunique com praticidade</h1>
            <h4 className="subtitle font-light">
              Economize tempo com as suas traduções e concentre-se nas tarefas
              que realmente importam. <br />
              Com o WaiwaiTapota, você tem traduções da lingua indigena Waiwai
              para o portugues.
            </h4>
            <Button
              className="btn btn-danger m-r-20 btn-md m-t-30 "
              onClick={toggle}
            >
              Download App
            </Button>
            {/* <Link href="/#coming">
              <a className="btn btn-md m-t-30  btn-outline-light ">
                Upgrade To Pro
              </a>
            </Link> */}
          </Col>
          <Col lg="6" md="6" className="py-4">
            <Image src={bannerimg} alt="hero banner" width={450} height={450} />
          </Col>
        </Row>

        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Baixe o nosso aplicativo</ModalHeader>
          <ModalBody className="d-block">
            <Badge href="../downloasApk/app-arm64-v8a-release.apk" className="mx-3">App 64-v8a</Badge>
            <Badge href="../downloasApk/app-arm64-v8a-release.apk" className="mx-3">App 64-v8a</Badge>
            <Badge href="../downloasApk/app-arm64-v8a-release.apk" className="mx-3">App 64-v8a</Badge>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );
};

export default Banner2;
