import { useState } from "react";

export const useChange = (initialValues) => {
  const [value, setValue] = useState(initialValues);

  const resetValue = () => {
    setValue("");
  };
  const handleChange = (e) => {
    if(!e) return;
    setValue(e.target.value);
  };

  return [value, handleChange, resetValue];
};
