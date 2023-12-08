
import { Spinner } from "react-bootstrap";

export default function FullScreenLoader() {


  return (
    <div className="loader-show">
      <Spinner animation="border" variant="dark" />
    </div>
  );
}
