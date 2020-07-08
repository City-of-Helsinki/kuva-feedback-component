import React from "react";

import I18nProvider from "../i18n/I18nProvider";
import defaultMessages from "../i18n/defaultMessages";
import { Messages } from "../i18n/types";
import FeedbackForm, {
  Props as FeedbackFormProps,
} from "../feedbackForm/FeedbackForm";

type Props = FeedbackFormProps & {
  messages?: Messages;
  locale: string;
};

function App({ locale, messages = defaultMessages, ...rest }: Props) {
  return (
    <I18nProvider locale={locale} messages={messages}>
      <FeedbackForm {...rest} />
    </I18nProvider>
  );
}

export default App;
