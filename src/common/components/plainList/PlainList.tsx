import React, { ReactNode } from "react";

import styles from "./plainList.module.css";

interface Props {
  items: ReactNode[];
}

function PlainList({ items }: Props) {
  return (
    <ul className={styles.ul}>
      {items.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={index} className={styles.li}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default PlainList;
