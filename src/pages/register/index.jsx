import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Register() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async data => {
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("bio", data.bio);
    formData.append("avatar", data.avatar[0]);

    // formData.append('password', data.password);

    const response = await fetch(`http://127.0.0.1:8000/user/create/`, {
      method: "POST",
      body: formData,
      // headers: {
      //   Authorization: "Bearer " + String(authTokens.access),
      // },
    });
  };

  const putSubmit = async data => {
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("bio", data.bio);
    formData.append("avatar", data.avatar[0]);

    // formData.append('password', data.password);

    const response = await fetch(`http://127.0.0.1:8000/user/update/3/`, {
      method: "PUT",
      body: formData,
      // headers: {
      //   Authorization: "Bearer " + String(authTokens.access),
      // },
    });
  };

  const deleteUser = async (e) => {
    e.preventDefault()
    const response = await fetch(
      `http://127.0.0.1:8000/user/delete/5/`,
      {
        method: "DELETE",
        // headers: {
        //   Authorization: "Bearer " + String(authTokens.access),
        // },
      }
    );
  };

  return (
    <Fragment>
      <h1>Register</h1>
      <Link to={"/"}>Home</Link>

      <div>
        <form
          style={{ display: "flex", flexDirection: "column", width: "200px" }}
          onSubmit={handleSubmit(onSubmit)}
          action=''
        >
          <input
            type='text'
            placeholder='first name'
            {...register("firstName", {
              required: true,
            })}
          />
          <input
            type='text'
            placeholder='last name'
            {...register("lastName", {
              required: true,
            })}
          />
          <input
            type='email'
            placeholder='email'
            {...register("email", {
              required: true,
            })}
          />
          <textarea
            placeholder='text'
            {...register("bio", {
              required: true,
            })}
          />
          <input
            type='file'
            accept='image/png, image/jpeg'
            {...register("avatar", {
              required: true,
            })}
          />

          {/* <input
            type='password'
            {...register("password", {
              required: true,
            })}
          /> */}

          <input type='submit' />
        </form>
      </div>

      {/* //////////////////////// */}

      <h2>Update</h2>

      <div>
        <form
          style={{ display: "flex", flexDirection: "column", width: "200px" }}
          onSubmit={handleSubmit(putSubmit)}
          action=''
        >
          <input
            type='text'
            placeholder='first name'
            {...register("firstName")}
          />
          <input
            type='text'
            placeholder='last name'
            {...register("lastName")}
          />
          <input type='email' placeholder='email' {...register("email")} />
          <textarea placeholder='text' {...register("bio")} />
          <input
            type='file'
            accept='image/png, image/jpeg'
            {...register("avatar")}
          />

          {/* <input
            type='password'
            {...register("password")}
          /> */}

          <input type='submit' />
        </form>
      </div>

      {/* ////////////////////////// */}

      <h2>delete</h2>

      <form 
      onSubmit={deleteUser}
      method="DELETE"
      >
        <input type='submit' />
      </form>
    </Fragment>
  );
}

export default Register;
