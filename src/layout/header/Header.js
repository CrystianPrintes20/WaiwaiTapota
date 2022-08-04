import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Row,
  Col,
  UncontrolledDropdown,
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
import logo from "../../assets/images/logos/white-text.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="topbar" id="top">
      <div className="header6">
        <Container className="po-relative">
          <Navbar className="navbar-expand-lg h6-nav-bar">
            <NavbarBrand href="/">
              {/* <Image src={logo} alt="wrapkit" /> */}
              <img src="http://via.placeholder.com/80x80"></img>
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
                <NavItem >
                  <Link href="/">
                    <a
                      className={
                        router.pathname == "/"
                          ? "text-white nav-link"
                          : "nav-link"
                      }
                    >
                     Home
                    </a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/basic">
                    <a
                      className={
                        router.pathname == "/basic"
                          ? "text-white nav-link"
                          : "nav-link"
                      }
                    >
                      About Me
                    </a>
                  </Link>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Lorem Ipsum</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Lorem Ipsum</NavLink>
                </NavItem>
           {/*      <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav>
                    Sign in/Sign up <i className="fa fa-angle-down m-l-5"></i>
                  </DropdownToggle>
                  <DropdownMenu className="b-none animated fadeInUp">
                    <DropdownItem>Sign in</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Sign up</DropdownItem>
                    
                  </DropdownMenu>
                </UncontrolledDropdown> */}
                
              </Nav>
  
              <div className="act-buttons">
                <NavLink
                  href="https://wrappixel.com/templates/nextkit-nextjs-free-uikit"
                  className="btn btn-outline-light font-14"
                  target="_blank"
                >
                  Sign in
                </NavLink>
              </div>
              <div className="act-buttons">
                <NavLink
                  href="https://wrappixel.com/templates/nextkit-nextjs-free-uikit"
                  className="btn btn-danger font-14"
                  target="_blank"
                >
                  Sign up
                </NavLink>
              </div>
            </Collapse>
          </Navbar>
        </Container>
      </div>
    </div>
  );
};

export default Header;
