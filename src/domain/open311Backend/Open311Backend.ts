/* eslint-disable camelcase */
import fetch from "../../common/fetch/fetch";
import Endpoint from "./Endpoint";
import PostServiceRequestEndpoint from "./postServiceRequestEndpoint/PostServiceRequestEndpoint";
import {
  Open311BackendConfig,
  Open311BackendInterface,
  Open311PostServiceRequest,
  Open311PostServiceResponses,
} from "./types";

class Open311Backend implements Open311BackendInterface {
  private config: Open311BackendConfig;

  private endpoints: {
    postServiceRequest: PostServiceRequestEndpoint;
  };

  serviceRequest = {
    post: (
      values: Omit<Open311PostServiceRequest, "api_key" | "service_code">
    ) => {
      const endpoint = this.endpoints.postServiceRequest;

      return this.call<
        Omit<Open311PostServiceRequest, "api_key" | "service_code">,
        Open311PostServiceResponses
      >(endpoint, values);
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

  private inject<T>(
    values: T
  ): T & {
    api_key: string;
    service_code: string;
  } {
    return {
      ...values,
      api_key: this.config.apiKey,
      service_code: this.config.serviceCode,
    };
  }

  private async call<Content, Response>(
    endpoint: Endpoint<Content>,
    content: Content
  ): Promise<Response> {
    const injectedContent = this.inject(content);
    const preparedContent = await endpoint.prepareContent(injectedContent);

    return fetch(endpoint.url, {
      method: endpoint.method,
      headers: endpoint.headers,
      body: preparedContent,
    });
  }
}

export default Open311Backend;
