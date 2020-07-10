import React from "react";

import I18nProvider from "../i18n/I18nProvider";
import defaultMessages from "../i18n/defaultMessages";
import { Messages } from "../i18n/types";
import FeedbackForm, {
  Props as FeedbackFormProps,
} from "../feedbackForm/FeedbackForm";
import { FormValues } from "../feedbackForm/types";
import { Open311BackendConfig } from "../open311Backend/types";
import useSubmitMethod from "./useSubmitMethod";

type InsertLocale = string | boolean;

function getInsertLocale(insertLocale: InsertLocale, locale: string) {
  if (insertLocale === true) {
    return locale;
  }

  if (typeof insertLocale === "string") {
    return insertLocale;
  }

  return null;
}

export type Props = Omit<FeedbackFormProps, "onSubmit"> & {
  messages?: Messages;
  locale: string;
  onSubmit?: (values: FormValues) => Promise<unknown>;
  backendConfig?: Open311BackendConfig;
  insertLocale?: InsertLocale;
};

function App({
  locale,
  messages = defaultMessages,
  backendConfig,
  onSubmit,
  insertLocale: externalInsertLocale = true,
  ...rest
}: Props) {
  const submitMethod = useSubmitMethod({ backendConfig, onSubmit });

  if (!submitMethod) {
    throw Error(
      "You must provide either a configuration object for the default backend, or implement a backend yourself by providing the onSubmit prop."
    );
  }

  const handleOnSubmit = (values: FormValues) => {
    const insertedLocale = getInsertLocale(externalInsertLocale, locale);

    if (insertedLocale) {
      return submitMethod({ ...values, locale: insertedLocale });
    }

    return submitMethod(values);
  };

  return (
    <I18nProvider locale={locale} messages={messages}>
      <FeedbackForm {...rest} onSubmit={handleOnSubmit} />
    </I18nProvider>
  );
}

export default App;
