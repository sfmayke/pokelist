import { Link } from "react-router-dom";
import "./NotFound.scss";

export default function NotFound() {
  return (
    <div className="notfound-root">
      <img src="./404-Page-Not-Found.png" alt="img-page-not-found" />
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
