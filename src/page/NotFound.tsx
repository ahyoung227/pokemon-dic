import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <p>Opps, we cannot find the page</p>
      <div>
        <Link to="/pokemon" style={{ color: "gray" }}>
          Go back to main page
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
