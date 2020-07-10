import React from "react";
import {
  Button,
  TextInput,
  TextArea,
  Checkbox,
  IconCrossCircle,
} from "hds-react";

import A from "../../common/components/a/A";
import PlainList from "../../common/components/plainList/PlainList";
import Text from "../../common/components/text/Text";
import ErrorBox from "../../common/components/errorBox/ErrorBox";
import FileUploadField from "../../common/components/fileUploadField/FileUploadField";
import FileUploadButton from "../../common/components/fileUploadButton/FileUploadButton";
import Dropdown from "../../common/components/dropdown/Dropdown";
import { FormTheme } from "../feedbackForm/types";
import styles from "./hdsTheme.module.scss";

const hdsTheme: FormTheme = {
  Page: (props) => (
    <div
      className={[styles.feedbackFormPage, styles.maxWidth].join(" ")}
      {...props}
    />
  ),
  SuccessContainer: (props) => <div {...props} />,
  Container: (props) => (
    <div className={styles.feedbackFormContainer} {...props} />
  ),
  LabeledSection: (props) => (
    <section className={styles.feedbackFormSection} {...props} />
  ),
  Section: (props) => <div className={styles.feedbackFormSection} {...props} />,
  FieldGrid: (props) => (
    <div className={styles.feedbackFormControlGrid} {...props} />
  ),
  ErrorBox: (props) => <ErrorBox {...props} />,
  PlainList: (props) => <PlainList {...props} />,
  TextInput: (props) => <TextInput {...props} />,
  TextArea: (props) => <TextArea {...props} />,
  Checkbox: (props) => <Checkbox {...props} />,
  FileUploadField: (props) => <FileUploadField {...props} />,
  Dropdown: (props) => <Dropdown {...props} />,
  ButtonAddFiles: (props) => <FileUploadButton {...props} />,
  ButtonRemoveFile: (props) => (
    <Button variant="supplementary" iconLeft={<IconCrossCircle />} {...props} />
  ),
  ButtonSubmit: (props) => <Button type="submit" {...props} />,
  TextH1: (props) => <Text variant="h1" {...props} />,
  TextH2: (props) => <Text variant="h2" {...props} />,
  TextP: (props) => <Text {...props} />,
  A: (props) => <A target="tab" variant="camouflaged" {...props} />,
};

export default hdsTheme;
