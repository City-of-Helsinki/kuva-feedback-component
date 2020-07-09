import React from "react";
import { IconUpload } from "hds-react";

import { ButtonAddFilesProps } from "../../../domain/feedbackForm/types";
import styles from "./fileUploadButton.module.scss";

// In order to provide an accessible label to the file upload while also
// keeping in line with the design, I have to provide a button-like
// element within the label. I can't do this with hds-react and I can't
// use hds-core directly, because I don't want to create a version
// conflict between HDS versions. The element can't be a button.
//
// To circumvent these limitation, I've included hds-core as a dev
// dependency. This means that the version of HDS we use is integrated
// during build time. This way we don't end up changing HDS style rules.
// We may end up changing CSS variables.
function FileUploadButton({ children, ...rest }: ButtonAddFilesProps) {
  return (
    <span role="button" className={styles.button} tabIndex={0} {...rest}>
      <span className={styles.icon} aria-hidden="true">
        <IconUpload />
      </span>
      <span className={styles.label}>{children}</span>
    </span>
  );
}

export default FileUploadButton;
