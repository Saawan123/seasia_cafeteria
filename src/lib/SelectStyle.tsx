export const SelectStyle = {
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: "",
    color: "black !important ",
    borderRadius: "0.375rem",
    // match with the menu
    // borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
    // Overwrittes the different states of border
    // borderColor: state.isFocused ? "yellow" : "green",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    border: 1,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#6D00C2" : "#6D00C2",
    },
  }),
  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
          ? "#6D00C2 !important"
          : isFocused
            ? " #7E77C1 "
            : undefined,
      cursor: isDisabled ? "not-allowed" : "default",
      color: isDisabled
        ? undefined
        : isSelected
          ? "white !important"
          : isFocused
            ? "black !important"
            : undefined,
      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : " "
          : undefined,
      },
    };
  },
  menu: (base: any) => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0,
  }),
  menuList: (base: any) => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
    // background: "#F4F4F4",
  }),
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
};

export const listingTableStyle = {
  headRow: {
    style: {
      paddingLeft: "30px",
      color: "#545454",
      minHeight: "35px",
      minWidth: "20px",

      fontWeight: "700",
    },
  },
  headCells: {
    style: {
      // fontFamily: "Poppins",
      fontSize: "13px",
      fontWeight: 700,
      lineHeight: "20px",
      letterSpacing: "0.01em",
      textAlign: "left",
      width: "100px",

      // textAlign: "center",

      // width: "100%",
      // fontSize: "20px",
      // fontWeight: "500",
      // textTransform: "uppercase",
      // paddingLeft: "0 8px",
    },
  },

  pagination: {
    style: {
      color: "",
      backgroundColor: "transarent",
    },
    pageButtonsStyle: {
      cursor: "pointer",
      transition: "0.4s",
      color: "#E70033",
      backgroundColor: "transparent",
      "&:disabled": {
        cursor: "unset",
        color: "",
        fill: "",
      },
      "&:hover:not(:disabled)": {
        // backgroundColor: '#E70033',
        color: "#E70033",
        backgroundColor: "transarent",
      },
      "&:focus": {
        outline: "none",
        backgroundColor: "transarent",
        color: "#E70033",
      },
      "&:hover": {
        backgroundColor: "transarent",
        fill: "#E70033",
      },
    },
  },
  cells: {
    style: {
      width: "120px",
    },
  },
  rows: {
    style: {
      paddingLeft: "30px",
      color: "#545454",
      "&:not(:last-of-type)": {
        borderBottomStyle: "solid",
        borderBottomWidth: "0px",
      },
      "&:nth-of-type(odd)": {
        backgroundColor: "#FAFAFA",
      },
    },
    denseStyle: {
      minHeight: "32px",
    },
    highlightOnHoverStyle: {
      transitionDuration: "0.15s",
      transitionProperty: "background-color",
      outlineStyle: "none",
      outlineWidth: "0",
    },
    stripedStyle: {},
  },
};

export const listingTableStyle1 = {
  headRow: {
    style: {
      paddingLeft: "30px",
      color: "#545454",
      minHeight: "35px",
      minWidth: "20px",
      fontWeight: "700",
    },
  },
  headCells: {
    style: {
      // fontFamily: "Poppins",
      fontSize: "13px",
      fontWeight: 700,
      lineHeight: "20px",
      letterSpacing: "0.01em",
      textAlign: "left",
      width: "100px",

      // textAlign: "center",

      // width: "100%",
      // fontSize: "20px",
      // fontWeight: "500",
      // textTransform: "uppercase",
      // paddingLeft: "0 8px",
    },
  },
  cells: {
    style: {
      width: "190px",
    },
  },
  rows: {
    style: {
      paddingLeft: "30px",
      color: "#545454",
      "&:not(:last-of-type)": {
        borderBottomStyle: "solid",
        borderBottomWidth: "0px",
      },
      "&:nth-of-type(odd)": {
        backgroundColor: "#FAFAFA",
      },
    },
    denseStyle: {
      minHeight: "32px",
    },
    highlightOnHoverStyle: {
      transitionDuration: "0.15s",
      transitionProperty: "background-color",
      outlineStyle: "none",
      outlineWidth: "0",
    },
    stripedStyle: {},
  },
};
