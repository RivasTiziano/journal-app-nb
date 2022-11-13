import { Grid, TextField } from "@mui/material";

export const InputLayout = ({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  error,
  helperText,
}) => {
  return (
    <Grid item xs={12} sx={{ mt: 2 }}>
      <TextField
        label={label}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        error={error}
        helperText={helperText}
        fullWidth
      />
    </Grid>
  );
};
