import { ServiceRequestTypes } from "./constants";
import { FormValues } from "./types";

const defaultInitialValues: FormValues = {
  serviceRequestType: ServiceRequestTypes.Other,
  title: null,
  description: "",
  media: null,
  firstName: null,
  lastName: null,
  email: null,
};

export default defaultInitialValues;
