import { createContext } from "react";

import { Messages } from "./types";

interface I18nContextType {
  locale: string;
  messages: Messages;
}

const I18nContext = createContext<I18nContextType>({
  locale: null,
  messages: null,
});

export default I18nContext;
