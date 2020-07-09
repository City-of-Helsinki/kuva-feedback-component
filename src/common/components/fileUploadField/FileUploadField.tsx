import React, { SyntheticEvent, KeyboardEvent } from "react";

import { FileUploadFieldProps } from "../../../domain/feedbackForm/types";
import FileUploadFieldFile from "./FileUploadFieldFile";
import styles from "./fileUploadField.module.scss";

export type Props = FileUploadFieldProps;

function FileUploadField({
  name,
  id,
  addFilesButton: Button,
  removeFileButton,
  value,
  onChange,
  onRemove,
  errors = [],
  addFilesButtonLabel,
  removeFileButtonLabel,
}: Props) {
  const fileInput = React.useRef<HTMLInputElement | null>(null);

  const handleOnChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const fileArray = Array.from(event.currentTarget.files);

    onChange(fileArray);
  };

  const handleBeginFileSelect = () => {
    const input = fileInput;

    if (input && input.current) {
      input.current.click();
    }
  };

  const handleButtonEmulation = (e: KeyboardEvent<HTMLSpanElement>) => {
    switch (e.charCode) {
      case 13: // Enter
      case 32: // Space
        e.preventDefault();
        handleBeginFileSelect();
        break;
      default:
    }
  };

  return (
    <>
      <input
        className={styles.visuallyHidden}
        ref={fileInput}
        id={id}
        name={name}
        type="file"
        onChange={handleOnChange}
        multiple
        readOnly
      />
      <div className={styles.fileUploadFieldFiles}>
        {value &&
          value.map((file, i) => (
            <FileUploadFieldFile
              key={file.name}
              name={file.name}
              size={file.size}
              onRemove={() => onRemove(i)}
              variant={errors[i] ? "invalid" : "success"}
              helperText={errors[i]}
              removeFileButtonLabel={removeFileButtonLabel}
              removeFileButton={removeFileButton}
            />
          ))}
      </div>
      <label htmlFor={id}>
        <Button
          aria-controls={id}
          onClick={handleBeginFileSelect}
          onKeyPress={handleButtonEmulation}
          onKeyUp={handleButtonEmulation}
        >
          {addFilesButtonLabel}
        </Button>
      </label>
    </>
  );
}

export default FileUploadField;
