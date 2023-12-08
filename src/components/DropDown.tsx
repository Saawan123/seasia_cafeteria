import { Dropdown } from "react-bootstrap";

const DropDown = ({ selected, setSelect, selectArray, disable, styled }: any) => {
  return (
    <Dropdown className="d-inline mx-1" align={{ lg: "end" }}>
      <Dropdown.Toggle
        id="dropdown-autoclose-true "
        className="drop-btn  white-dropdown"
        variant="light"
        disabled={disable ? disable : false}
      >
        {selected}
      </Dropdown.Toggle>

      <Dropdown.Menu className="mt-3 p-0 " style={{ left: styled ? '0px' : "" }}>
        {((selectArray && selectArray?.length != 0) ? selectArray : [])?.map((x: any, index: any) => (
          <Dropdown.Item
            active={selected == x?.id ? true : false}
            key={index}
            className="p-3 "
            onClick={() => setSelect(x?.id)}
          >
            {x?.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDown;
