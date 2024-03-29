import { Grid, Typography } from "@mui/material";

export const AuthLayout = ({ children, title = '' }) => {
  return (
    <Grid
    
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 8 }}
    >
      <Grid
        item
        className="box-shadow animate__animated animate__bounceInLeft"
        xs={3}
        sx={{
          width: { sm: 500 },
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>

        {
          //nota: recien aca entendi que es el children
          children
        }
      </Grid>
    </Grid>
  );
};
