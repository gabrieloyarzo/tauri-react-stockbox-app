import { useState, useEffect } from "react";

export const usePropsChanged = ({ currentProps, initialProps }) => {
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (JSON.stringify(currentProps) !== JSON.stringify(initialProps)) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [currentProps, initialProps]);

  return { isChanged };
};
