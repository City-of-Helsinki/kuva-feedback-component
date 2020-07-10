import React, { ReactEventHandler, ReactNode } from "react";

type Props = {
  renderToggle: (renderProps: {
    checked: boolean;
    onChange: ReactEventHandler<HTMLInputElement>;
  }) => void;
  hasContentThatShouldBeVisible: boolean;
  children: ReactNode;
};

function SectionToggle({
  renderToggle,
  hasContentThatShouldBeVisible,
  children,
}: Props) {
  const isUserSelection = React.useRef(false);
  const [checked, setChecked] = React.useState<boolean>(false);

  const handleChange = () => {
    isUserSelection.current = true;
    setChecked((prevChecked) => !prevChecked);
  };

  React.useEffect(() => {
    const isNotVisible = !checked;
    const isNotUserSelection = !isUserSelection.current;

    if (hasContentThatShouldBeVisible && isNotVisible && isNotUserSelection) {
      setChecked(true);
    }
  }, [hasContentThatShouldBeVisible, checked]);

  return (
    <>
      {renderToggle({ checked, onChange: handleChange })}
      {checked ? children : null}
    </>
  );
}

export default SectionToggle;
