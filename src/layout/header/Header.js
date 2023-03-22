import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { User, LogOut } from "react-feather";
import axios from "axios";
import {
  Row,
  Col,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  NavbarBrand,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
} from "reactstrap";
import Image from "next/image";
import versaoWeb from "../../assets/aplicativoTapota/icones-logo-tapota/tapotaIconSF.png";
import { getSession, useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggle = () => setIsOpen(!isOpen);
  const { data: session } = useSession();

  return (
    <div className="topbar" id="top">
      <div className="header6">
        <Container className="po-relative">
          <Navbar className="navbar-expand-lg h6-nav-bar">
            <NavbarBrand href="/">
              <Image src={versaoWeb} alt="wrapkit" /> 
              
            </NavbarBrand>
            <NavbarToggler onClick={toggle}>
              <span className="ti-menu"></span>
            </NavbarToggler>
            <Collapse
              isOpen={isOpen}
              navbar
              className="hover-dropdown ml-auto"
              id="h6-info"
            >
              <Nav navbar className="ml-auto mt-2 mt-lg-0">
                <NavItem>
                  <Link href="/">
                    <a
                      className={
                        router.pathname == "/"
                          ? "text-white nav-link"
                          : "nav-link"
                      }
                    >
                      <b className={
                        router.pathname == "/"
                          ? "border-bottom border-danger pb-0"
                          : null
                      }>Home </b>
                    </a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/myWord">
                    <a
                      className={
                        router.pathname == "/myWord"
                          ? "text-white nav-link"
                          : "nav-link"
                      }
                    >
                      <b className={
                        router.pathname == "/myWord"
                          ? "border-bottom border-danger pb-0"
                          : null
                      }>Minhas palavras</b>
                    </a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/dictionary">
                    <a
                      className={
                        router.pathname == "/dictionary"
                          ? "text-white nav-link"
                          : "nav-link"
                      }
                    >
                      <b className={
                        router.pathname == "/dictionary"
                          ? "border-bottom border-danger pb-0"
                          : null
                      }>Dicionário</b>
                    </a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/registerwords">
                    <a
                      className={
                        router.pathname == "/registerwords"
                          ? "text-white nav-link"
                          : "nav-link"
                      }
                    >
                      <b className={
                        router.pathname == "/registerwords"
                          ? "border-bottom border-danger pb-0"
                          : null
                      }>Cadastrar Palavras</b>
                    </a>
                  </Link>
                </NavItem>
              </Nav>
              {session ? (
                <>
                  {/* <div className="act-buttons">
                    <Link href="/auth/registerformik">
                      <button
                        onClick={() => signOut()}
                        className="nav-link btn btn-danger font-14"
                      >
                        Sign out
                      </button>
                    </Link>
                  </div> */}

                  <UncontrolledDropdown>
                    <DropdownToggle color="transparent">
                      <div className="d-flex gap-3 border-bottom border-danger p-0">
                        <span className="text-truncate mr-3">
                          <h6 className="mb-0 text-white text-uppercase">
                            {session.user.username}
                          </h6>
                          <small className="elipsis">
                            {session.user.email}
                          </small>
                        </span>

                        <User
                          className="border rounded-circle"
                          size={40}
                          color="white"
                        />
                      </div>
                    </DropdownToggle>

                    <DropdownMenu dark>
                      {/* <DropdownItem>
                        <User className="mr-2" size={25} /> Meu perfil
                      </DropdownItem> */}
                      <DropdownItem onClick={() => signOut()}>
                        <LogOut className="mr-2" size={25} />
                        Sair
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </>
              ) : (
                <>
                  <div className="act-buttons">
                    <Link href="/auth/loginformik">
                      <a
                        className={
                          router.pathname == "/auth/loginformik"
                            ? "text-white nav-link btn btn-outline-light font-14"
                            : "nav-link btn btn-outline-light font-14"
                        }
                      >
                        Sign In
                      </a>
                    </Link>
                  </div>

                  <div className="act-buttons">
                    <Link href="/auth/registerformik">
                      <a
                        className={
                          router.pathname == "/auth/registerformik"
                            ? "text-white nav-link btn btn-danger font-14"
                            : "nav-link btn btn-danger font-14"
                        }
                      >
                        Sign up
                      </a>
                    </Link>
                  </div>
                </>
              )}
            </Collapse>
          </Navbar>
        </Container>
      </div>
    </div>
  );
};

export default Header;
