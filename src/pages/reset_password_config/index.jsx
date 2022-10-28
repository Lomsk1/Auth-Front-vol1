import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { resetPasswordConfirm } from "../../auth/authApi";

function ResetPasswordConfirm() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const uid = useParams();
  const token = useParams();

  const onSubmit = async data => {
    const formData = new FormData();

    formData.append("uid", uid);
    formData.append("token", token);
    formData.append("new_password", data.new_password);
    formData.append("re_new_password", data.re_new_password);
    
    console.log(formData)
    dispatch(resetPasswordConfirm(formData));
  };
  0;

  return (
    <Fragment>
      <h1>Reset Password Confirm</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type='password'
          placeholder='new password'
          {...register("new_password", {
            required: true,
          })}
        />
        <input
          type='password'
          placeholder='re new password'
          {...register("re_new_password", {
            required: true,
          })}
        />
        <input type='submit' />
      </form>
    </Fragment>
  );
}

export default ResetPasswordConfirm;
