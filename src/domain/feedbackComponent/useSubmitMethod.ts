import useOpen311Backend from "../open311Backend/useOpen311backend";
import { Open311BackendConfig } from "../open311Backend/types";
import { FormValues } from "../feedbackForm/types";

interface Props {
  onSubmit?: (values: FormValues) => Promise<unknown>;
  backendConfig?: Open311BackendConfig;
}

function useSubmitMethod({ backendConfig, onSubmit }: Props) {
  const open311Backend = useOpen311Backend(backendConfig);

  return open311Backend ? open311Backend.post.serviceRequest : onSubmit;
}

export default useSubmitMethod;
