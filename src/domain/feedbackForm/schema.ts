import * as yup from "yup";

const MAX_FILE_SIZE = 5 * 1000000;

const fileObject = yup
  .mixed()
  .test(
    "fileSize",
    "field.media.error.tooLarge",
    (value) => value.size <= MAX_FILE_SIZE
  )
  // All file types seem to be allowed.
  .test("fileType", "Unsupported File Format", () => true);

export default yup.object({
  title: yup.string().nullable(),
  description: yup
    .string()
    .required("field.description.error.required")
    .min(10, "field.description.error.min")
    .max(5000, "field.description.error.max"),
  media: yup.array(fileObject).nullable(),
  firstName: yup.string().nullable(),
  lastName: yup.string().nullable(),
  email: yup.string().nullable(),
});
