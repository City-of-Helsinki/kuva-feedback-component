import React, { ReactNode } from "react";
import { Notification } from "hds-react";

interface Props {
  label: string;
  children?: ReactNode;
}

function ErrorBox({ label, children }: Props) {
  return (
    <Notification type="error" labelText={label}>
      {children}
    </Notification>
  );
}

export default ErrorBox;
