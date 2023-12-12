import { OverlayTrigger, Tooltip } from "react-bootstrap";

const renderTooltip = (x:any) => (
  <Tooltip id="button-tooltip" {...x}>
    {x}
  </Tooltip>
);

const ToolTipDetails = ({ data, data1, placement }: any) => {
  return (
    <>
      <OverlayTrigger
        placement={placement ? placement : "bottom"}
        delay={{ show: 250, hide: 100 }}
        overlay={renderTooltip(data)}
      >
        <div>{data1 ? data1 : data}</div>
      </OverlayTrigger>
    </>
  );
};

export default ToolTipDetails;
