import { memo } from "react";
import { searchIcon } from "../lib/icon";

const InputImage = ({
  name,
  placeholder,
  showValue,
  addValue,
  disabled,
  firstView,
  onKeyDown1,
  className
}: any) => {
  return (
    <div className="d-flex my-3">
       {firstView && (
        <div className="mt-2 px-2 position-absolute">
          <span className="srchIcon">
            {searchIcon}
          </span>
        </div>
      )}

      <input
        type={"text"}
        className={"form-control common-input listing-name-sec  border-end-1 rounded-2 " + className}
        name={name}
        disabled={disabled ? disabled : false}
        placeholder={placeholder ? placeholder : ""}
        value={showValue}
        onKeyDown={onKeyDown1}
        onChange={addValue}
      />

      {!firstView && (
        <div className="mt-2 px-2 position-absolute">
          <span className="srchIcon">
            {searchIcon}
          </span>
        </div>
      )}
    </div>
  );
};

export default memo(InputImage);
