import { memo } from "react";
import Form from "react-bootstrap/Form";

const UserInput = ({
  labelname,
  name,
  placeholder,
  labelText,
  refs,
  addValue,
  showValue,
  type,
  error,
  defaultValue,
  id,
  disabled,
  totalPercentage,
  important,
  className,
  multiple,
  maxLength,
  as,
  autoComplete,
  style,
  onKeyDown = () => { }

}: any) => {
  return (
    <>

      <div className="position-relative">
        {labelname && (
          <div>
            <label className="common-head-fw mb-2 py-0 fw-500">
              {labelname ? labelname : ""}
              {important && <span className="text-danger"> *</span>}
            </label>{" "}
            <span className="fs-7">{labelText ? `(${labelText})` : ""}</span>
          </div>
        )}
        <div className="d-flex align-items-center bg-input wsr-outerShadow">
          <Form.Control
            className={className + " common-input listing-name-sec "}
            style={style}
            type={type ? type : "text"}
            placeholder={placeholder ? placeholder : name}
            name={name}
            onChange={addValue}
            as={as}
            autoComplete={autoComplete ? "off" : ""}

            // autoFocus
            ref={refs}
            // defaultValue={defaultValue}
            id={id}
            maxLength={maxLength ? maxLength : ""}
            value={showValue}
            disabled={disabled ? disabled : false}
            multiple={multiple ? multiple : false}
            onKeyDown={onKeyDown}
          />
          {totalPercentage && (
            <label className="px-2 text-muted">
              {totalPercentage == "NaN%" || totalPercentage == "Infinity%" ? "0%" : totalPercentage.substring(0, 5)}
            </label>
          )}
        </div>
        {error && <p className="text-danger fs-14 mb-1">{error}</p>}
      </div>

    </>
  );
};

export default memo(UserInput);
