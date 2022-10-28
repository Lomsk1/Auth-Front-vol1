import { useContext } from "react";
import { Navigate } from "react-router";
import AuthContext from "../helper/authorisationContext";

// export default function PrivateRoute({ children }) {
//   const { user } = useContext(AuthContext);

//   return user ? children : <Navigate to={"/login"} replace={true} />;
// }

function PrivateRouter({ children }) {
  const { user } = useContext(AuthContext);

  return user ? children : "You are not authorized";
}

export default PrivateRouter;
