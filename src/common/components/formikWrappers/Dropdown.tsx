import React, { ComponentType } from "react";

import useField from "../../hooks/useField";
import { DropdownProps } from "../../../domain/feedbackForm/types";

type Props = Omit<DropdownProps, "value" | "onChange"> & {
  component: ComponentType<DropdownProps>;
};

function DropdownWithFormik({
  component: Component,
  name,
  helperText,
  ...rest
}: Props) {
  const [field, , , error] = useField(name);

  return (
    <Component
      {...field}
      invalid={Boolean(error)}
      helperText={error || helperText}
      {...rest}
    />
  );
}

export default DropdownWithFormik;
