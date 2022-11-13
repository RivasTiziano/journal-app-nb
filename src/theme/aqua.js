import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
 


export const aquaTheme = createTheme({
    palette: {
        primary: {
            main: "#00A0B3"
        },
        secondary: {
            main: "#543884"
        },
        error: {
            main: red.A200
        }
    }
})