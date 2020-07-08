import { Schema } from "yup";

import fetch from "../../../common/fetch/fetch";
import { Method, Clean, Dirty } from "../types";
import { clean } from "./utils";
import Message from "./Message";

type Transform<T> = (message: Message<T>) => Message<BodyInit | null>;

class Endpoint<DirtyContent extends Dirty, Content extends Clean, Responses> {
  method: Method;

  url: string;

  contentType: string;

  validationSchema: Schema<Content>;

  transform: Transform<Content>;

  constructor(
    method: Method,
    url: string,
    contentType: string,
    validationSchema: Schema<Content>,
    transform: Transform<Content>
  ) {
    this.method = method;
    this.url = url;
    this.contentType = contentType;
    this.validationSchema = validationSchema;
    this.transform = transform;

    this.validate = this.validate.bind(this);
    this.makeRequest = this.makeRequest.bind(this);
  }

  async validate(message: Message<Content>): Promise<Message<Content>> {
    await this.validationSchema.validate(message.content);

    return message;
  }

  async makeRequest(message: Message<BodyInit | null>): Promise<Responses> {
    return fetch<Responses>(this.url, {
      method: this.method,
      headers: {
        "Content-type": this.contentType,
      },
      body: message.content,
    });
  }

  async call(message: Message<DirtyContent>): Promise<Responses> {
    const cleanMessage = clean<DirtyContent, Content>(message);
    const validatesMessage = await this.validate(cleanMessage);
    const transformedMessage = this.transform(validatesMessage);

    return this.makeRequest(transformedMessage);
  }
}

export default Endpoint;