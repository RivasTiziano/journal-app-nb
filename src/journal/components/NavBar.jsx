import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../store/auth/thunks";
import { setToggleSideBar } from "../../store/journal/journalSlice";

export const NavBar = ({ drawerWidth }) => {

  const { isSaving } = useSelector(state=>state.journal)
  const dispatch = useDispatch();

  const onLogout = ()=>{
    dispatch(startLogout());
  }

  const onToggleSideBar = ()=>{
    dispatch( setToggleSideBar() )
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          onClick={ onToggleSideBar }
          edge='end'
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>
        
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography noWrap component="div"/>

          <IconButton disabled={ isSaving } onClick={onLogout} color="error">
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
