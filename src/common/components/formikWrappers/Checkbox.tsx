import React from "react";
import { Checkbox, CheckboxProps } from "hds-react";

import useField from "../../hooks/useField";

function CheckboxWithFormik(props: CheckboxProps) {
  const [field] = useField({
    // eslint-disable-next-line react/destructuring-assignment
    name: props.name,
    type: "checkbox",
  });

  return <Checkbox {...field} {...props} />;
}

export default CheckboxWithFormik;
