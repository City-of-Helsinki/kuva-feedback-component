import React, { ReactNode } from "react";

import styles from "./a.module.scss";

type Target = "tab";
type Variant = "default" | "camouflaged";

interface Props {
  children: ReactNode | string;
  href: string;
  target: Target;
  variant?: Variant;
}

interface AdditionalProps {
  target?: string;
  rel?: string;
}

function getAdditionalProps(target: Target): AdditionalProps {
  switch (target) {
    case "tab":
      return {
        target: "_blank",
        rel: "noreferrer noopener",
      };
    default:
      return {};
  }
}

function A({ children, href, target, variant = "default" }: Props) {
  const additionalProps = getAdditionalProps(target);
  const className = [styles.a, styles[variant]]
    .filter((style) => style)
    .join(" ");

  return (
    <a href={href} {...additionalProps} className={className}>
      {children}
    </a>
  );
}

export default A;
