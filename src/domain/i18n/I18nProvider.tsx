import React, { ReactNode } from "react";

import I18nContext from "./I18nContext";
import { Messages } from "./types";

interface Props {
  children: ReactNode;
  locale: string;
  messages: Messages;
}

function I18nProvider({ children, locale, messages }) {
  return (
    <I18nContext.Provider
      value={{
        locale,
        messages,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export default I18nProvider;
