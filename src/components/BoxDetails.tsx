
export default function BoxDetails(props: any) {

    return (
      <div className="row gx-0">
        <div className="col-12">
          <ul className="row px-3 gy-3 stats gap-3">
            {props?.data?.map((x:any, index:any) => (
              <li
                className="p-3 pb-4 col card mt-5 custom-col-120  border d-flex flex-column rounded-4  pointer-c"
                ref={(element) => {
                  element &&
                    element.style.setProperty("border-color", x?.boxColor, "important");
                  props.option == x?.name
                    ? element?.style.setProperty(
                      "background",
                      x?.bgcolor,
                      "important"
                    )
                    : element?.style.setProperty("background", "", "important");
                }}
                onClick={() => {
                  props.setOption(x?.name);
                  props?.closeDataTable(false);
  
                }}
                key={x?.name + index}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h3>{x.title ? x.title : ""}</h3>
                  <label className="fs-6">{x.title1 ? x.title1 : ""}</label>
                </div>
  
                <div className="">
                  {x.details1 ? (
                    <label
                      className="fs-5 fw-500"
                    >
                      {x.details1 ? x.details1 : ""}
                    </label>
                  ):     <label
                  className="fs-5 fw-500 h-30"
                >
                </label>}
                  <div>
                    <h6 className="fw-normal my-1 report-summary-text">{x.name ? x.name : ""}</h6>
                    <span className="fw-light fs-6 ">{x.details ? x.details : ""}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  