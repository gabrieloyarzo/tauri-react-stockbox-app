import { useState, useEffect } from "react";

export const usePropsChanged = ({ obj }) => {
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (obj?.desde !== undefined && obj?.desde !== null && obj?.desde !== "") {
      setIsChanged(true);
    } else if (
      obj?.hasta !== undefined &&
      obj?.hasta !== null &&
      obj?.hasta !== ""
    ) {
      setIsChanged(true);
    } else if (
      obj?.valor !== undefined &&
      obj?.valor !== null &&
      obj?.valor !== ""
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [obj.desde, obj.hasta, obj.valor]);

  return { isChanged };
};
