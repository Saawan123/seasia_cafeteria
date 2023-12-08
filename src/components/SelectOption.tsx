import { memo, useMemo } from "react";

import Select from "react-select";

import { SelectStyle } from "../lib/SelectStyle";

const SelectOption = memo(
  ({
    optionsList,
    optionValue,
    addValue,
    name,
    isMulti,
    disabled1,
    placeholder,
    customClass,
    error,
    labelText,
    important,
    disabled,
    isSearchable,
  }: any) => {
    const optionList1 = useMemo(() => {
      return optionsList;
    }, [optionsList]);

    return (
      <div className="listing-select">
        {labelText && (
          <label className="mb-2 py-0 gray-151 fw-500 fs-14">
            {labelText}
            {important && <span className="text-danger"> *</span>}
          </label>
        )}
        <Select
          options={optionList1}
          name={name}
          isMulti={isMulti}
          isDisabled={disabled1 && true}
          placeholder={placeholder && placeholder}
          onChange={(e) => addValue(e, name)}
          value={optionValue}
          className={customClass ? customClass : "input-radius"}
          styles={SelectStyle}
          // isOptionDisabled={disabled && disabled}
          isSearchable={!isSearchable ? false : true}
          menuPosition={"fixed"}
          isClearable={isMulti && isSearchable ? true : !isSearchable ? true : false}
        />
        {error && <span className="text-danger fs-14 mt-1 d-inline-block select-error">{error}</span>}
      </div>
    );
  }
);

export default SelectOption;
