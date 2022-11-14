import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { aquaTheme } from "./aqua";

export const AppTheme = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={ aquaTheme }>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
};
