import React from "react";
import { TextArea, TextAreaProps } from "hds-react";

import useField from "../../hooks/useField";

function TextAreaWithFormik(props: TextAreaProps) {
  // eslint-disable-next-line react/destructuring-assignment
  const [field, , , error] = useField(props.name);

  return (
    <TextArea
      {...field}
      {...props}
      invalid={Boolean(error)}
      // eslint-disable-next-line react/destructuring-assignment
      helperText={error || props.helperText}
    />
  );
}

export default TextAreaWithFormik;
