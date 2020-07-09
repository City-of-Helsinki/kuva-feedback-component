import React, { ComponentType } from "react";

import useTranslation from "../../../domain/i18n/useTranslation";
import { Props as FileUploadFieldProps } from "../fileUploadField/FileUploadField";
import useField from "../../hooks/useField";

type Props = Omit<
  FileUploadFieldProps,
  "value" | "onChange" | "onRemove" | "errors"
> & {
  component: ComponentType<FileUploadFieldProps>;
};

function FileUploadFieldWithFormik({
  name,
  id,
  component: Component,
  labelText,
  required,
  addFilesButton,
  removeFileButton,
  addFilesButtonLabel,
  removeFileButtonLabel,
}: Props) {
  const [t] = useTranslation();
  // eslint-disable-next-line react/destructuring-assignment
  const [field, meta, helpers] = useField(name);
  const errors: string[] = ((meta.error as unknown) as string[]) || [];
  const translatedErrors = errors.map((error) => t(error));

  return (
    <Component
      value={field.value}
      onChange={(files) => helpers.setValue(files)}
      onRemove={(index) => {
        const nextValue = field.value.filter(
          (_: File, i: number) => index !== i
        );

        helpers.setValue(nextValue);
      }}
      id={id}
      name={name}
      // eslint-disable-next-line react/destructuring-assignment
      labelText={labelText}
      required={required}
      addFilesButton={addFilesButton}
      removeFileButton={removeFileButton}
      errors={translatedErrors}
      addFilesButtonLabel={addFilesButtonLabel}
      removeFileButtonLabel={removeFileButtonLabel}
    />
  );
}

export default FileUploadFieldWithFormik;
