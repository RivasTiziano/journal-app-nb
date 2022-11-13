import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { InputLayout } from "../components/InputField";
import { useForm } from "../../hooks/useForm";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";

const userIS = {
  email: "",
  password: "",
};

export const LoginPage = ({}) => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const isAuth = useMemo(() => status === "checking", [status]);

  const { email, password, onInputChange } = useForm( userIS );

  const dispatch = useDispatch();

  const onLoginSubmit = (event) => {
    event.preventDefault();

    dispatch(startLoginWithEmailPassword({ email, password }));

  };

  const onGoogleSignIn = () => dispatch(startGoogleSignIn());


  return (
    <AuthLayout title="Login">
      <form onSubmit={onLoginSubmit} >
        <Grid container>
          <InputLayout
            label={"Correo"}
            type={"email"}
            placeholder={"correo@google.com"}
            onChange={onInputChange}
            value={email}
            name="email"
          />

          <InputLayout
            label={"Contraseña"}
            type={"password"}
            placeholder={"Contraseña"}
            onChange={onInputChange}
            value={password}
            name="password"
          />

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuth}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuth}
                onClick={onGoogleSignIn}
                variant="contained"
                fullWidth
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
