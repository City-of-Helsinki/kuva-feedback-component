import Endpoint from "../api/Endpoint";
import Message from "../api/Message";
import {
  Open311PostServiceRequestCamelCase,
  Open311PostServiceRequest,
  Open311PostServiceResponses,
  Method,
} from "../types";
import postServiceRequestEndpointSchema from "./schemas";

function toUrlParams(
  message: Message<Open311PostServiceRequest>
): Message<FormData> {
  const formData = new FormData();

  Object.entries(message.content).forEach(([key, value]) => {
    if (typeof value === "string") {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((valueItem) => {
        if (valueItem instanceof File) {
          formData.append(`${key}[]`, valueItem);
        }
      });
    }
  });

  return message.setContent(formData);
}

class PostServiceRequestEndpoint extends Endpoint<
  Open311PostServiceRequestCamelCase,
  Open311PostServiceRequest,
  Open311PostServiceResponses
> {
  constructor(url: string) {
    super(
      Method.POST,
      url,
      undefined,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      postServiceRequestEndpointSchema,
      toUrlParams
    );
  }
}

export default PostServiceRequestEndpoint;
