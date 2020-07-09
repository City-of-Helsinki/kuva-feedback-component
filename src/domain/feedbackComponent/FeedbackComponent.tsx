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

export type Props = Omit<FeedbackFormProps, "onSubmit"> & {
  messages?: Messages;
  locale: string;
  onSubmit?: (values: FormValues) => Promise<unknown>;
  backendConfig?: Open311BackendConfig;
};

function App({
  locale,
  messages = defaultMessages,
  backendConfig,
  onSubmit,
  ...rest
}: Props) {
  const submitMethod = useSubmitMethod({ backendConfig, onSubmit });

  if (!submitMethod) {
    throw Error(
      "You must provide either a configuration object for the default backend, or implement a backend yourself by providing the onSubmit prop."
    );
  }

  const handleOnSubmit = (values: FormValues) => {
    return submitMethod(values);
  };

  return (
    <I18nProvider locale={locale} messages={messages}>
      <FeedbackForm {...rest} onSubmit={handleOnSubmit} />
    </I18nProvider>
  );
}

export default App;
