import React from "react";

import Open311Backend from "./Open311Backend";
import { Open311BackendConfig, Open311BackendInterface } from "./types";

function useOpen311Backend(
  config: Open311BackendConfig
): Open311BackendInterface | null {
  const backend = React.useMemo(() => {
    if (config) {
      return new Open311Backend(config);
    }

    return null;
  }, [config]);

  return backend;
}

export default useOpen311Backend;
