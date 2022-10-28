import axios from "axios";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signUp } from "../../auth/authApi";
import Navbar from "../../components/navbar";

function SingUp() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async data => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("re_password", data.re_password);

    dispatch(signUp(data));
  };

  const continueWithGoogle = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/auth/o/google-oauth2/?redirect_url=http://localhost:8000/`
      );

      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  return (
    <Fragment>
      <Navbar />
      <h1>Sing up</h1>

      <form method='POST' onSubmit={handleSubmit(onSubmit)}>
        <input
          type='text'
          name='first_name'
          placeholder='first_name'
          {...register("first_name", {
            required: true,
          })}
        />
        <input
          type='text'
          name='last_name'
          placeholder='last_name'
          {...register("last_name", {
            required: true,
          })}
        />
        <input
          type='email'
          // name='email'
          placeholder='email'
          {...register("email", {
            required: true,
          })}
        />
        <input
          type='password'
          // name='password'
          placeholder='password'
          {...register("password", {
            required: true,
          })}
        />
        <input
          type='password'
          // name='re_password'
          placeholder='re_password'
          {...register("re_password", {
            required: true,
          })}
        />
        <input type='submit' />
      </form>
      <button onClick={continueWithGoogle}>Continue With Google</button>
    </Fragment>
  );
}

export default SingUp;
