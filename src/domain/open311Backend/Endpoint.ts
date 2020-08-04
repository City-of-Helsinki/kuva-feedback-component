import { Schema } from "yup";

import { Method } from "./types";

abstract class Endpoint<Content> {
  method: Method;

  url: string;

  headers: HeadersInit;

  validationSchema: Schema<Content>;

  constructor(method: Method, url: string, contentType: string) {
    this.method = method;
    this.url = url;

    if (contentType) {
      this.headers = {
        "Content-type": contentType,
      };
    }

    this.prepareContent = this.prepareContent.bind(this);
  }

  abstract async validate(content: Content): Promise<Content>;

  abstract transform(content: Content): BodyInit | null;

  async prepareContent(content: Content): Promise<BodyInit | null> {
    const validatedContent = await this.validate(content);
    const transformedContent = this.transform(validatedContent);

    return transformedContent;
  }
}

export default Endpoint;
