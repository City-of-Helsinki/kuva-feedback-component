import React, { ReactElement } from "react";

import styles from "./text.module.scss";

type Variant = "p" | "h1" | "h2";

interface Props {
  children: ReactElement | string;
  variant?: Variant;
}

function Text({ children, variant = "p" }: Props) {
  return React.createElement(variant, { className: styles[variant] }, children);
}

export default Text;
