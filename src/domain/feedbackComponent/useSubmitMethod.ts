import React from "react";

import useOpen311Backend from "../open311Backend/useOpen311backend";
import {
  Open311BackendConfig,
  Open311PostServiceRequest,
} from "../open311Backend/types";
import { FormValues } from "../feedbackForm/types";

function removeNull<T>(obj: T): Exclude<T, null> {
  const filteredObject = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== null) {
      filteredObject[key] = value;
    }
  });

  return filteredObject as Exclude<T, null>;
}

function toSnakeCase<T, K>(obj: T): K {
  const transformedObject = {};

  Object.entries(obj).forEach(([key, value]) => {
    const transformedKey = key.replace(
      /[A-Z]/g,
      (letter) => `_${letter.toLowerCase()}`
    );

    transformedObject[transformedKey] = value;
  });

  return transformedObject as K;
}

export function clean(formValues: FormValues): Open311PostServiceRequest {
  const nullFreeFormValues = removeNull<FormValues>(formValues);
  const snakeCaeFormValues = toSnakeCase<
    Exclude<FormValues, null>,
    Open311PostServiceRequest
  >(nullFreeFormValues);

  return snakeCaeFormValues;
}

interface Props {
  onSubmit?: (values: FormValues) => Promise<unknown>;
  backendConfig?: Open311BackendConfig;
}

function useSubmitMethod({ backendConfig, onSubmit }: Props) {
  const open311Backend = useOpen311Backend(backendConfig);

  const handleOpen311BackendSubmit = React.useCallback(
    (formValues: FormValues) => {
      const postServiceRequest = clean(formValues);

      return open311Backend.post.serviceRequest(postServiceRequest);
    },
    [open311Backend]
  );

  return open311Backend ? handleOpen311BackendSubmit : onSubmit;
}

export default useSubmitMethod;
