import React from "react";
import get from "lodash.get";

import { Messages } from "../../domain/i18n/types";

interface Props {
  currentLocale: string;
  messages: Messages;
}

function useTranslation({ currentLocale, messages }: Props) {
  const t = React.useCallback(
    (stringPath: string): string | null => {
      return get(messages, `${currentLocale}.${stringPath}`, null);
    },
    [currentLocale, messages]
  );

  return [t];
}

export default useTranslation;
