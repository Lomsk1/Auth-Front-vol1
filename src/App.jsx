import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { checkAuth, googleAuthenticate } from "./auth/authApi";
import { selectAuth } from "./auth/authSlice";
import PrivateRoute from "./hoc/protectedRouter";
import ActivateAccount from "./pages/activate_account";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Register from "./pages/register";
import ResetPassword from "./pages/reset_password";
import ResetPasswordConfirm from "./pages/reset_password_config";
import SingIN from "./pages/sign-in/sign_in";
import SingUp from "./pages/sign-up/sign_up";
import queryString from 'query-string'


function App() {
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //       dispatch(checkAuth());
  //     console.log("auth");
  //   }
  // }, []);

  // useEffect(()=>{
  //   dispatch(checkAuth())
  // },[])

  useEffect(() => {
    // const search = location.search; // could be '?foo=bar'
    // const values = new URLSearchParams(search);
    const values = queryString.parse(location.search);
    const state = values.state ? values.state : null;
    const code = values.code ? values.code : null;

    if (state && code) {
      dispatch(googleAuthenticate({ state: state, code: code }));
    }

    console.log(`state: ${state}.  code : ${code}`);
  }, [location]);

  return (
    <Routes>
      <Route path='/*' element={<Home />} />

      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

      <Route path='/sign_in' element={<SingIN />} />
      <Route path='/sign_up' element={<SingUp />} />

      <Route path='/reset_password' element={<ResetPassword />} />
      <Route
        path='/password/reset/confirm/:uid/:token'
        element={<ResetPasswordConfirm />}
      />
      <Route path='/activate/:uid/:token' element={<ActivateAccount />} />

      <Route
        path='/profile'
        element={
          // <PrivateRoute>
          <Profile />
          // </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
