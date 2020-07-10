/* eslint-disable camelcase */
import { ServiceRequestTypes } from "../feedbackForm/constants";

export type Open311BackendConfig = {
  apiKey: string;
  url: string;
  serviceCode: string;
};

export type Open311PostServiceRequestCamelCase = {
  serviceRequestType: ServiceRequestTypes; // Probably CitySDK specific
  description: string;
  title: string | null; // CitySDK specific
  lat: string | null;
  serviceObjectType: string | null; // CitySDK specific
  serviceObjectId: string | null; // CitySDK specific
  addressString: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  mediaUrl: string | null;
  media: File[] | null;
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
    values: Open311PostServiceRequestCamelCase
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

export type Dirty = Record<string, string | null | File[]>;
export type Clean = Record<string, string | File[]>;
