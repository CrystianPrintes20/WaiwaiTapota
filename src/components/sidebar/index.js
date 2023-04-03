import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import {
  Dashboard,
  SettingsSuggest,
  Group,
} from "@mui/icons-material";
import versaoWeb from "../../assets/aplicativoTapota/icones-logo-tapota/logobrancov1.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function SidebarAdmin(props) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDrawer = () => {
    setOpen(!open);
  };

  const icons = [
    <Dashboard key={1}/>,
    <SettingsSuggest key={2}/>,
    <Group key={3}/>,
  ];
  const routes = [
    "/admin",
    "/admin/manegerWords",
    "/admin/listUsers",
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open} sx={{ backgroundColor: "#702119",  zIndex: "9" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Perfil de Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#702119"
            /* backgroundImage: "url(./androidLarge.png)", */
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader className="my-2">
          <Image src={versaoWeb} />
          <IconButton onClick={handleDrawer}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider className="bg-primary" />
        <List>
          {[
            "Dashboard",
            "Gerenciar Palavras",
            "Lista de Usuários",
          ].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton>
                <ListItemIcon className="text-white">
                  {icons[index]}
                </ListItemIcon>
                <Link href={`${routes[index]}`}>
                  <a
                    className={
                      router.pathname == `${routes[index]}`
                        ? "text-success nav-link"
                        : "text-white nav-link"
                    }
                  >
                    <ListItemText primary={text} />
                  </a>
                </Link>
              </ListItemButton>
              {/*  <Link href={`${routes[index]}`}>
                <a
                  className={
                    router.pathname == `${routes[index]}` ? "text-success nav-link" : "text-white nav-link"
                  }
                >
                  <ListItemText
                  primary={text} sx={{ opacity: open ? 1 : 0 }}
                    className={
                      router.pathname == `${routes[index]}`
                        ? "border-bottom border-ligth pb-0"
                        : null
                    }
                  />
                </a>
              </Link> */}
            </ListItem>
          ))}
        </List>

        <List style={{ marginTop: `auto` }}>
          <Divider className="bg-primary" />

          <ListItem className="text-white my-2">
            <Avatar alt="Remy Sharp" src="/team1.png" className="mr-2" />
            <Link href={"/admin/profile"}>
              <a
                className={
                  router.pathname == "/admin/profile"
                    ? "text-success nav-link"
                    : "text-white nav-link"
                }
              >
                <ListItemText>Admin</ListItemText>
              </a>
            </Link>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {props.children}
      </Main>
    </Box>
  );
}