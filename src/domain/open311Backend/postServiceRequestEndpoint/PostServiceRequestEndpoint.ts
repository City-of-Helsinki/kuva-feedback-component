import Endpoint from "../api/Endpoint";
import { toUrlParams } from "../api/utils";
import {
  Open311PostServiceRequestCamelCase,
  Open311PostServiceRequest,
  Open311PostServiceResponses,
  Method,
} from "../types";
import postServiceRequestEndpointSchema from "./schemas";

class PostServiceRequestEndpoint extends Endpoint<
  Open311PostServiceRequestCamelCase,
  Open311PostServiceRequest,
  Open311PostServiceResponses
> {
  constructor(url: string) {
    super(
      Method.POST,
      url,
      "application/x-www-form-urlencoded; charset=utf-8",
      postServiceRequestEndpointSchema,
      toUrlParams
    );
  }
}

export default PostServiceRequestEndpoint;
