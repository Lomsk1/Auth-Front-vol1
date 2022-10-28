import { Fragment, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authLogin, checkAuth, loadUser } from "../../auth/authApi";
import { selectAuth } from "../../auth/authSlice";
import { useForm } from "react-hook-form";
import AuthContext from "../../helper/authorisationContext";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function SingIN() {

  const navigate = useNavigate()

  const { loginUser, user } = useContext(AuthContext);

    // const dispatch = useDispatch();

  // const { isAuthenticated } = useSelector(selectAuth);

  // const { register, handleSubmit } = useForm();

  // const onSubmit = async data => {
  //   const formData = new FormData();

  //   formData.append("email", data.email);
  //   formData.append("password", data.password);

  //   dispatch(authLogin(data));
  // };0

  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[user, navigate])


  return (
    <Fragment>
      <Navbar />
      <h1>Sing in</h1>

      <form
        // onSubmit={handleSubmit(onSubmit)}
        onSubmit={loginUser}
      >
        <input
          type={"text"}
          placeholder={"Type Your email"}
          name={'email'}
          // {...register("email", {
          //   required: true,
          // })}
        />

        <input
          type={"password"}
          placeholder={"Type Your Password"}
          name={'password'}
          // {...register("password", {
          //   required: true,
          // })}
        />

        <button type='submit'>Click Me</button>
      </form>

      <Link to={'/reset_password'}>password reset</Link>
    </Fragment>
  );
}

export default SingIN;
