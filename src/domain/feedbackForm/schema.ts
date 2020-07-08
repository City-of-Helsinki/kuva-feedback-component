import * as yup from "yup";

export default yup.object({
  title: yup.string().nullable(),
  description: yup
    .string()
    .required("field.description.error.required")
    .min(10, "field.description.error.min")
    .max(5000, "field.description.error.max"),
  media: yup.array(yup.object()).nullable(),
  firstName: yup.string().nullable(),
  lastName: yup.string().nullable(),
  email: yup.string().nullable(),
});
