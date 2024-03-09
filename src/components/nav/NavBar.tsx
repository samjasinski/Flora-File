import { Link, Navigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  async function logOut() {
    await sessionStorage.clear();
    <Navigate to="/login"></Navigate>;
  }

  return (
    <div className={"navbar grid grid-cols-11 lg:py-10 md:py-2 sm:py-1"}>
      <Link className="col-start-3 link" to="/home">
        Home
      </Link>
      <Link className="col-start-5 link" to="/add">
        Add
      </Link>
      <Link className="col-start-7 link" to="/display">
        Display
      </Link>
      <Link className="col-start-9 link" to="/login">
        <span onClick={logOut}>Logout</span>
      </Link>
    </div>
  );
};

export default NavBar;
