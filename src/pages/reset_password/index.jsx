import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../auth/authApi";

function ResetPassword() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async data => {
    // const formData = new FormData();

    // formData.append("email", data.email);
    // formData.append("password", data.password);

    dispatch(resetPassword(data));
  };
  0;

  return (
    <Fragment>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} method='POST'>
        <input
          type='email'
          placeholder='email'
          defaultValue={"lomsianidzegiorgi123@gmail.com"}
          {...register("email", {
            required: true,
          })}
        />
        <input type='submit' />
      </form>
    </Fragment>
  );
}

export default ResetPassword;
