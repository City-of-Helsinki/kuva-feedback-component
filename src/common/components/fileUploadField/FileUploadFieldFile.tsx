import React from "react";
import { IconCheck, IconError } from "hds-react";

import { FileUploadFieldProps } from "../../../domain/feedbackForm/types";
import styles from "./fileUploadFieldFile.module.scss";

function formatBytes(bytes: number, decimals = 2) {
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

type Props = Pick<
  FileUploadFieldProps,
  "removeFileButton" | "removeFileButtonLabel" | "helperText"
> & {
  name: string;
  size: number;
  onRemove: () => void;
  variant: "invalid" | "success";
};

function FileUploadFieldFile({
  name,
  size,
  onRemove,
  variant = "success",
  helperText,
  removeFileButton: RemoveFileButton,
  removeFileButtonLabel,
}: Props) {
  const humanizedSize = formatBytes(size);
  const isInvalid = variant === "invalid";

  return (
    <div
      className={[
        styles.fileUploadFieldFileWrapper,
        isInvalid ? styles.fileUploadFieldFileWrapperInvalid : undefined,
      ]
        .filter((style) => style)
        .join(" ")}
    >
      <div className={styles.fileUploadFieldFileRow}>
        <div className={styles.fileUploadFieldFileInfo}>
          <div>{name}</div>
          <div className={styles.fileUploadFieldFileIcon}>
            {isInvalid ? <IconError /> : <IconCheck />}
          </div>
        </div>
        <RemoveFileButton onClick={onRemove}>
          {removeFileButtonLabel}
        </RemoveFileButton>
      </div>
      {helperText && (
        <div className={styles.fileUploadFieldFileRow}>
          <span className={styles.fileUploadFieldFileHelperText}>
            {`${helperText} (${humanizedSize})`}
          </span>
        </div>
      )}
    </div>
  );
}

export default FileUploadFieldFile;
