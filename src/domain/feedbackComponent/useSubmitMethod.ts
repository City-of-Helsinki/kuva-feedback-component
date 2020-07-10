import React from "react";

import useOpen311Backend from "../open311Backend/useOpen311backend";
import {
  Open311BackendConfig,
  Open311PostServiceRequest,
} from "../open311Backend/types";
import { FeedbackComponentValues } from "./types";

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

export function clean(
  feedbackComponentValues: FeedbackComponentValues
): Open311PostServiceRequest {
  const nullFreeFeedbackComponentValues = removeNull<FeedbackComponentValues>(
    feedbackComponentValues
  );
  const snakeCaeFeedbackComponentValues = toSnakeCase<
    Exclude<FeedbackComponentValues, null>,
    Open311PostServiceRequest
  >(nullFreeFeedbackComponentValues);

  return snakeCaeFeedbackComponentValues;
}

interface Props {
  onSubmit?: (values: FeedbackComponentValues) => Promise<unknown>;
  backendConfig?: Open311BackendConfig;
}

function useSubmitMethod({
  backendConfig,
  onSubmit,
}: Props): (values: FeedbackComponentValues) => Promise<unknown> {
  const open311Backend = useOpen311Backend(backendConfig);

  const handleOpen311BackendSubmit = React.useCallback(
    (feedbackComponentValues: FeedbackComponentValues) => {
      const postServiceRequest = clean(feedbackComponentValues);

      return open311Backend.post.serviceRequest(postServiceRequest);
    },
    [open311Backend]
  );

  return open311Backend ? handleOpen311BackendSubmit : onSubmit;
}

export default useSubmitMethod;
