import { Checkbox, FormControl, FormControlLabel, styled } from "@mui/material";
import React from "react";

const LabelText = styled(({ children, required = false }) => {
  return (
    <p>
      {children}
      {required ? " *" : ""}
    </p>
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
      {label && <LabelText required={required}>{children}</LabelText>}
      <input
        type={type}
        className="form-control"
        value={value}
        style={{ ...inputStyle }}
        onChange={onChange ? onChange : null}
        {...register}
        placeholder={children}
      />
    </FormControl>
  );
};
