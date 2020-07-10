/* eslint-disable camelcase */
import { ServiceRequestTypes } from "../feedbackForm/constants";

export type Open311BackendConfig = {
  apiKey: string;
  url: string;
  serviceCode: string;
};

export type Open311PostServiceRequest = {
  api_key: string;
  service_code: string;
  service_request_type: ServiceRequestTypes; // Probably CitySDK specific
  description: string;
  title?: string; // CitySDK specific
  lat?: string;
  service_object_type?: string; // CitySDK specific
  service_object_id?: string; // CitySDK specific
  address_string?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  media_url?: string;
  media?: File[];
};

type Open311PostServiceResponse = {
  service_request_id: string;
  service_notice: string;
};

type GeneralServiceError = {
  code: 400;
  name: "General Service Error";
};

type ServiceCodeNotFoundError = {
  code: 404;
  name: "Service code not found";
};

type JurisdictionIdNotFoundError = {
  code: 404;
  name: "Jurisdiction id not found";
};

export type Open311PostServiceResponses =
  | Open311PostServiceResponse
  | GeneralServiceError
  | ServiceCodeNotFoundError
  | JurisdictionIdNotFoundError;

interface PostMethods {
  serviceRequest: (
    values: Omit<Open311PostServiceRequest, "api_key" | "service_code">
  ) => Promise<Open311PostServiceResponses>;
}

export interface Open311BackendInterface {
  post: PostMethods;
}

export enum Method {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

export type MessageContent = Record<string, string | File[]>;
