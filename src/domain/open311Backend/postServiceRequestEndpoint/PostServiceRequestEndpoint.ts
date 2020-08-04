/* eslint-disable class-methods-use-this */
import Endpoint from "../Endpoint";
import { Open311PostServiceRequest, Method } from "../types";
import postServiceRequestEndpointSchema from "./schemas";

function toUrlParams(content: Open311PostServiceRequest): FormData {
  const formData = new FormData();

  Object.entries(content).forEach(([key, value]) => {
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

  return formData;
}

class PostServiceRequestEndpoint extends Endpoint<Open311PostServiceRequest> {
  constructor(url: string) {
    super(Method.POST, url, undefined);
  }

  async validate(
    content: Open311PostServiceRequest
  ): Promise<Open311PostServiceRequest> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return postServiceRequestEndpointSchema.validate(content);
  }

  transform(content: Open311PostServiceRequest): BodyInit | null {
    return toUrlParams(content);
  }
}

export default PostServiceRequestEndpoint;
