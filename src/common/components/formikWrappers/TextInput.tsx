import React from "react";
import { TextInput, TextInputProps } from "hds-react";

import useField from "../../hooks/useField";

function TextInputWithFormik(props: TextInputProps) {
  // eslint-disable-next-line react/destructuring-assignment
  const [field, , , error] = useField(props.name);

  return (
    <TextInput
      {...field}
      {...props}
      invalid={Boolean(error)}
      // eslint-disable-next-line react/destructuring-assignment
      helperText={error || props.helperText}
    />
  );
}

export default TextInputWithFormik;
