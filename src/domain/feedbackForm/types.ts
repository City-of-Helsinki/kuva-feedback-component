import {
  ComponentType,
  ReactNode,
  ReactEventHandler,
  KeyboardEvent,
} from "react";

import { InputProps } from "../../common/components/formikWrappers/Input";

export interface FormValues {
  title: string | null;
  description: string;
  media: File[] | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

export type ButtonAddFilesProps = {
  children: ReactNode;
  onClick: ReactEventHandler<HTMLSpanElement>;
  onKeyPress: (e: KeyboardEvent<HTMLSpanElement>) => void;
  onKeyUp: (e: KeyboardEvent<HTMLSpanElement>) => void;
};

export type ButtonRemoveFileProps = {
  children: ReactNode;
  onClick: ReactEventHandler<HTMLButtonElement>;
};

export type FileUploadFieldProps = InputProps & {
  value: File[];
  onChange: (files: File[]) => void;
  onRemove: (index: number) => void;
  addFilesButton: ComponentType<ButtonAddFilesProps>;
  removeFileButton: ComponentType<ButtonRemoveFileProps>;
  addFilesButtonLabel: string;
  removeFileButtonLabel: string;
  errors?: string[];
};

export interface FormTheme {
  Page: ComponentType;
  Container: ComponentType;
  LabeledSection: ComponentType;
  Section: ComponentType;
  FieldGrid: ComponentType;
  ErrorBox: ComponentType<{
    label: string;
  }>;
  PlainList: ComponentType<{
    children?: undefined;
    items: ReactNode[];
  }>;
  TextH1: ComponentType;
  TextH2: ComponentType;
  TextP: ComponentType;
  TextInput: ComponentType<InputProps>;
  TextArea: ComponentType<
    InputProps & {
      onChange: ReactEventHandler<HTMLTextAreaElement>;
      onBlur: ReactEventHandler<HTMLTextAreaElement>;
      onFocus: ReactEventHandler<HTMLTextAreaElement>;
    }
  >;
  Checkbox: ComponentType<
    Omit<InputProps, "value"> & {
      checked?: boolean;
    }
  >;
  FileUploadField: ComponentType<FileUploadFieldProps>;
  ButtonAddFiles: ComponentType<ButtonAddFilesProps>;
  ButtonRemoveFile: ComponentType<ButtonRemoveFileProps>;
  ButtonSubmit: ComponentType<{
    children: ReactNode;
  }>;
  A: ComponentType<{
    children: ReactNode;
    href: string;
  }>;
}
