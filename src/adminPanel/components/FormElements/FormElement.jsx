import {
  Checkbox,
  FormControl,
  FormControlLabel,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

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
  error = false,
  floatLabel = false,
}) => {
  if (type === "checkbox") {
    value = value ? value : false;
    return (
      <FormControlLabel
        label={children}
        control={
          <Checkbox checked={value} onChange={onChange ? onChange : null} />
        }
      />
    );
  } else {
    value = value ? value : "";
    return (
      <FormControl sx={{ ...sx }}>
        {label && !floatLabel && (
          <LabelText required={required}>{children}</LabelText>
        )}
        <TextField
          type={type}
          value={value}
          error={error}
          style={{ ...inputStyle }}
          onChange={onChange ? onChange : null}
          {...register}
          placeholder={!floatLabel ? children : null}
          label={floatLabel ? children : null}
        />
      </FormControl>
    );
  }
};

export const ControlledFormElement = ({
  control,
  required = false,
  name,
  label,
  asNumber = false,
  error = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field: { onChange, value } }) => {
        return (
          <FormElement
            value={value}
            required={required}
            error={error}
            onChange={(e) => onChange(asNumber ? parseInt(e.target.value) : e)}
          >
            {label}
          </FormElement>
        );
      }}
    />
  );
};
