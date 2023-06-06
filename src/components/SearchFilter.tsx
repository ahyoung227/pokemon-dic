import React, { useEffect } from "react";
import useDebounce from "../customHooks/useDebounce";

type refreshFunctionProps = {
  refreshFunction: (searchWord: string) => void;
};

function SearchFilter(props: refreshFunctionProps) {
  const [inputValue, handleDelayChange] = useDebounce({
    delay: 1000
  });

  const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDelayChange(e);
  };

  useEffect(() => {
    props.refreshFunction(inputValue);
  }, [inputValue]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        onChange={onChangeFilter}
      />
    </div>
  );
}

export default SearchFilter;
