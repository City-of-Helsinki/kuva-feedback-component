/* eslint-disable camelcase */
import Message from "./api/Message";
import PostServiceRequestEndpoint from "./postServiceRequestEndpoint/PostServiceRequestEndpoint";
import {
  Open311BackendConfig,
  Open311BackendInterface,
  Open311PostServiceRequest,
} from "./types";

class Open311Backend implements Open311BackendInterface {
  private config: Open311BackendConfig;

  private endpoints: {
    postServiceRequest: PostServiceRequestEndpoint;
  };

  post = {
    serviceRequest: (
      values: Omit<Open311PostServiceRequest, "api_key" | "service_code">
    ) => {
      const endpoint = this.endpoints.postServiceRequest;
      const message = this.createMessage<
        Omit<Open311PostServiceRequest, "api_key" | "service_code">
      >(values);

      return endpoint.call(message);
    },
  };

  constructor(config: Open311BackendConfig) {
    this.config = config;

    this.endpoints = {
      postServiceRequest: new PostServiceRequestEndpoint(
        `${this.config.url}/v1/requests.json`
      ),
    };
  }

  private createMessage<T>(
    values: T
  ): Message<
    T & {
      api_key: string;
      service_code: string;
    }
  > {
    return new Message<
      T & {
        api_key: string;
        service_code: string;
      }
    >({
      ...values,
      api_key: this.config.apiKey,
      service_code: this.config.serviceCode,
    });
  }
}

export default Open311Backend;
