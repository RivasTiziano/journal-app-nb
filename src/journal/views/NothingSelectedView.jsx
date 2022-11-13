import { StarOutline } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";

export const NothingSelectedView = ({}) => {
  return (
    <Grid
      color="white"
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "calc(100vh - 110px)",
        backgroundColor: "primary.main",
        borderRadius: 3,
      }}
    >
      <Grid item xs={12}>
        <StarOutline sx={{ fontSize: 80 }} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" >
          Selecciona o crea una entrada
        </Typography>
      </Grid>
    </Grid>
  );
};
