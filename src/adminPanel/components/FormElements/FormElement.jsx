import React from "react";
import { Col, FormGroup, Label } from "reactstrap";

export const FormElement = ({
  md,
  onChange,
  register,
  id,
  children,
  type = "text",
  value,
  label = true,
  style,
}) => {
  if (type === "checkbox") {
    return (
      <Col style={{ ...style }} md={md}>
        <FormGroup inline>
          <Label style={{ cursor: "pointer" }}>
            <input
              value={value}
              onChange={onChange ? onChange : null}
              {...register}
              style={{ fontSize: "30px", marginRight: 10 }}
              type="checkbox"
            />
            {children}
          </Label>
        </FormGroup>
      </Col>
    );
  }

  return (
    <Col style={{ ...style }} md={md}>
      <FormGroup>
        {label && <Label for={id}>{children}</Label>}

        <input
          type={type}
          className="form-control"
          id={id}
          value={value}
          onChange={onChange ? onChange : null}
          {...register}
          placeholder={children}
        />
      </FormGroup>
    </Col>
  );
};
