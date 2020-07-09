import React from "react";
import { Dropdown } from "hds-react";

import { DropdownProps } from "../../../domain/feedbackForm/types";

type Props = DropdownProps;

// By default the dropdown API in HDS is a bit far removed from normal
// form logic. To make it a bit more agnostic to be more easily replaced
// with the theme, I have created an integration layer which hides HDS's
// implementation details.
function DropdownWrapper({
  name,
  id,
  onChange,
  value,
  helperText,
  labelText,
  options,
  ...rest
}: Props) {
  const handleChange = (selectedItem) => {
    onChange({
      target: { name, value: selectedItem.value },
    });
  };

  const defaultValue = options.find((option) => option.value === value);

  return (
    <Dropdown
      id={id}
      multiselect={false}
      label={labelText}
      helper={helperText}
      onChange={handleChange}
      defaultValue={defaultValue}
      options={options}
      {...rest}
    />
  );
}

export default DropdownWrapper;
