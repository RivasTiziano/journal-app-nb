import { Close } from "@mui/icons-material";
import { Box, Divider, Drawer, IconButton, List, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setToggleSideBar } from "../../store/journal/journalSlice";
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWidth = 280}) => {
  
  const dispatch = useDispatch();
  const { displayName } = useSelector((state) => state.auth);
  const { notes, active, toggleSideBar } = useSelector((state) => state.journal);

  const onToggleSideBar = ()=>{
    dispatch( setToggleSideBar() )
  }

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth },display: { xs: toggleSideBar ? 'block' : 'none',  sm: "block" }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent" // temporary
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            { displayName }
          </Typography>
          <IconButton onClick={ onToggleSideBar } sx={{ display: { sm: "none" } }}>
            <Close/>
          </IconButton>
        </Toolbar>
        
        <Divider />

        <List>
          {notes.map((note) => (
            <SideBarItem key={ note.id } { ...note } activeIcon={ note.id === active?.id }/>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
