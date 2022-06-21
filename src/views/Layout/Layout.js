import { Outlet } from "react-router-dom";
import { Container, AppBar } from "@mui/material";

import Navigation from "../../components/Navigation";

export default function Layout() {
  return (
    <Container maxWidth="false">
      <AppBar position="static">
        <Navigation />
      </AppBar>
      <Outlet />
    </Container>
  );
}
