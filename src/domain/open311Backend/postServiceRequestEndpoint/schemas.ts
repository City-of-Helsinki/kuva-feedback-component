import * as yup from "yup";

const postServiceRequestEndpointSchema = yup.object().shape(
  {
    api_key: yup.string().required(),
    service_code: yup.string().required(),
    description: yup.string().required().min(10).max(5000),
    title: yup.string().nullable(), // CitySDK specific
    lat: yup.string().nullable(),
    service_object_type: yup
      .string()
      .when("service_object_id", (serviceObjectId, schema) => {
        if (serviceObjectId) {
          return schema.require();
        }

        return schema;
      }), // CitySDK specific
    service_object_id: yup
      .string()
      .when("service_object_type", (serviceObjectType, schema) => {
        if (serviceObjectType) {
          return schema.require();
        }

        return schema;
      }), // CitySDK specific
    address_string: yup.string().nullable(),
    email: yup.string().nullable(),
    first_name: yup.string().nullable(),
    last_name: yup.string().nullable(),
    phone: yup.string().nullable(),
    media_url: yup.string().nullable(),
    media: yup.array(yup.mixed()).nullable(),
  },
  [["service_object_type", "service_object_id"]]
);

export default postServiceRequestEndpointSchema;
