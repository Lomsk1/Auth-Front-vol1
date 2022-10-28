import { Fragment, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkAuth, logout } from "../../auth/authApi";
import AuthContext from "../../helper/authorisationContext";

function Navbar() {
  const { logoutUser, user } = useContext(AuthContext);

  const submitH = () => {
    logoutUser();
  };

  if (!user) {
    return (
      <Fragment>
        <h1>NAVBAR</h1>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        -----------------------------------
        <Link to={"/sign_in"}>Sign in</Link>
        <Link to={"/sign_up"}>Sign up</Link>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <h1>NAVBAR</h1>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        -----------------------------------
        <button onClick={submitH}>Logout</button>
      </Fragment>
    );
  }
}

export default Navbar;
