import { Box, Toolbar } from "@mui/material";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";


export const JournalLayout = ({ children }) => {
  
  const drawerWidth = 280;

  return (
    <>
      <Box
        sx={{ display: "flex" }}
        className="animate__animated animate__fadeIn "
      >
        <NavBar drawerWidth={drawerWidth} />

        <SideBar className="sideBar" drawerWidth={drawerWidth} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
};
