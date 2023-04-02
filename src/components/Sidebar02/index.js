import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import Link from "next/link";
import { useRouter } from "next/router";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import {
  FaUser,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaGem,
  FaList,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {
  SidebarMenuBody,
  SidebarMenuFooter,
  SidebarMenuHeader,
} from "react-bootstrap-sidebar-menu";
import logo from "../../assets/aplicativoTapota/icones-logo-tapota/tapotaIconSF.png";
import Image from "next/image";

export default function SidebarAdmin02() {
  const { collapseSidebar } = useProSidebar();
  const router = useRouter();

  return (
    <div id="app" style={({ height: "100vh" }, { display: "flex" })} className="bg-primary">
      <Sidebar style={{ height: "100vh" }} >
        {/* Header */}
        <SidebarMenuHeader>
          <Menu className="my-4">
            <MenuItem
              icon={<MenuOutlinedIcon />}
              onClick={() => {
                collapseSidebar();
              }}
              style={{ textAlign: "center" }}
            >
              <Image src={logo} alt="wrapkit" />
            </MenuItem>
          </Menu>
        </SidebarMenuHeader>,

        {/* Body */}
        <SidebarMenuBody>
          <Menu iconShape="circle">
            <MenuItem
              icon={<FaTachometerAlt />}
              /* suffix={<span className="badge red">NEW</span>} */
            >
              <Link href="/">
                <a
                  className={
                    router.pathname == "/" ? "text-white nav-link" : "nav-link"
                  }
                >
                  <b
                    className={
                      router.pathname == "/"
                        ? "border-bottom border-danger pb-0"
                        : null
                    }
                  >
                    Dashboard
                  </b>
                </a>
              </Link>
            </MenuItem>
            <MenuItem icon={<FaGem />}>
              <Link href="/">
                <a
                  className={
                    router.pathname == "/" ? "text-white nav-link" : "nav-link"
                  }
                >
                  <b
                    className={
                      router.pathname == "/"
                        ? "border-bottom border-danger pb-0"
                        : null
                    }
                  >
                    Components
                  </b>
                </a>
              </Link>
            </MenuItem>
            {/* <SubMenu
              suffix={<span className="badge yellow">3</span>}
              title={"With Suffix"}
              icon={<FaRegLaughWink />}
            >
              <MenuItem>Submenu 1</MenuItem>
              <MenuItem>Submenu 2</MenuItem>
              <MenuItem>Submenu 3</MenuItem>
            </SubMenu>
            <SubMenu
              prefix={<span className="badge gray">3</span>}
              title={"With Prefix"}
              icon={<FaHeart />}
            >
              <MenuItem>Submenu 1</MenuItem>
              <MenuItem>Submenu 2</MenuItem>
              <MenuItem>Submenu 3</MenuItem>
            </SubMenu>
            <SubMenu title={"Multi Level"} icon={<FaList />}>
              <MenuItem>Submenu 1 </MenuItem>
              <MenuItem>Submenu 2 </MenuItem>
              <SubMenu title={"Submenu 3"}>
                <MenuItem>Submenu 3.1 </MenuItem>
                <MenuItem>Submenu 3.2 </MenuItem>
              </SubMenu>
            </SubMenu> */}
          </Menu>
        </SidebarMenuBody>

      </Sidebar>
      <main>
        <div>jsdfuskjdfghjskafdhjcsbjçvb jsfdvksfhvjshbvjksbv
          gsdgs 
        </div>
        <hr></hr>
      </main>
    </div>
  );
}
