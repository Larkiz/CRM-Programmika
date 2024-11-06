import {
  Checkbox,
  FormControl,
  FormControlLabel,
  styled,
  TextField,
  Typography,
} from "@mui/material";

const LabelText = styled(({ children, required = false }) => {
  return (
    <Typography>
      {children}
      {required ? " *" : ""}
    </Typography>
  );
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

export const FormElement = ({
  onChange,
  register,
  children,
  type = "text",
  value,
  label = true,
  required,
  sx,
  inputStyle,
  floatLabel = false,
}) => {
  if (type === "checkbox") {
    return (
      <FormControlLabel
        label={children}
        control={
          <Checkbox checked={value} onChange={onChange ? onChange : null} />
        }
      />
    );
  }

  return (
    <FormControl sx={{ ...sx }}>
      {label && !floatLabel && (
        <LabelText required={required}>{children}</LabelText>
      )}
      <TextField
        type={type}
        value={value}
        style={{ ...inputStyle }}
        onChange={onChange ? onChange : null}
        {...register}
        placeholder={!floatLabel ? children : null}
        label={floatLabel ? children : null}
      />
    </FormControl>
  );
};
