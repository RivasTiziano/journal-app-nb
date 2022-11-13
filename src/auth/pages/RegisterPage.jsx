import { Alert, Button, Grid, Link } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { Link as RouterLink } from "react-router-dom";
import { InputLayout } from "../components/InputField";
import { useForm } from "../../hooks/useForm";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

const formData = {
  email: "",
  password: "",
  displayName: "",
};

const formValidations = {
  email: [(value) => value.includes("@"), "El correo debe de tener una @"],
  password: [
    (value) => value.length > 6,
    "El password debe de tener más de 6 letras.",
  ],
  displayName: [(value) => value.length > 1, "El nombre es obligatorio."],
};

export const RegisterPage = ({}) => {
  
  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  const {
    email,
    password,
    displayName,
    onInputChange,
    emailValid,
    passwordValid,
    displayNameValid,
    isFormValid,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(
      startCreatingUserWithEmailPassword({ displayName, email, password })
    );
  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={onSubmit}>
        <Grid container>
          <InputLayout
            label={"Name"}
            type={"name"}
            placeholder={"Name"}
            onChange={onInputChange}
            value={displayName}
            name="displayName"
            error={!!displayNameValid && formSubmitted}
            helperText={displayNameValid}
          />
          <InputLayout
            label={"Email"}
            type={"email"}
            placeholder={"email@google.com"}
            onChange={onInputChange}
            value={email}
            name="email"
            error={!!emailValid && formSubmitted}
            helperText={emailValid}
          />
          <InputLayout
            label={"Password"}
            type={"password"}
            placeholder={"Password"}
            onChange={onInputChange}
            value={password}
            name="password"
            error={!!passwordValid && formSubmitted}
            helperText={passwordValid}
          />

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
                Register
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/login">
              You already have account?
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
