import React, { useContext } from "react";

import I18nContext from "./I18nContext";

function useTranslation() {
  const { locale: currentLocale, messages } = useContext(I18nContext);

  const t = React.useCallback(
    (stringPath: string): string | null => {
      const messageSet = messages[currentLocale] || null;
      const message = messageSet[stringPath];

      return message || stringPath;
    },
    [currentLocale, messages]
  );

  return [t];
}

export default useTranslation;
