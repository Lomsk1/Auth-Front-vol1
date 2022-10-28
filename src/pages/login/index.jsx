import { Fragment, useContext } from "react";
import AuthContext from "../../helper/authorisationContext";
import { Link } from "react-router-dom";

function Login() {
  const { loginUser, user, logoutUser } = useContext(AuthContext);

  if (!user) {
    return (
      <Fragment>
        <h1>Login</h1>
        <form onSubmit={loginUser}>
          <input
            type={"text"}
            placeholder={"Type Your username"}
            name={"username"}
          />

          <input
            type={"password"}
            placeholder={"Type Your Password"}
            name={"password"}
          />

          <button type='submit'>Click Me</button>
        </form>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <h1>User is Activate</h1>
        <Link to={"/"}>Home</Link>

        <button onClick={logoutUser}>Log Out</button>
      </Fragment>
    );
  }
}

export default Login;
