import { ComponentType, ReactNode, ReactEventHandler } from "react";

import { InputProps } from "../../common/components/formikWrappers/Input";

export interface FormValues {
  title: string | null;
  description: string;
  media: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

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
    children: undefined;
    items: ReactNode[];
  }>;
  TextH1: ComponentType;
  TextH2: ComponentType;
  TextP: ComponentType;
  TextInput: ComponentType<InputProps>;
  TextArea: ComponentType<InputProps>;
  ButtonAddFile: ComponentType<{
    children: ReactNode;
  }>;
  ButtonSubmit: ComponentType<{
    children: ReactNode;
  }>;
  Checkbox: ComponentType<{
    name: string;
    id: string;
    checked?: boolean;
    onChange?: ReactEventHandler<HTMLInputElement>;
    labelText: string;
  }>;
  A: ComponentType<{
    children: ReactNode;
    href: string;
  }>;
}
