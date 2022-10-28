import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../../api/post/postApi";
import { selectPost } from "../../api/post/postSlice";
import { loadUser } from "../../auth/authApi";
import Navbar from "../../components/navbar";

function Profile() {
  const dispatch = useDispatch();
  const { post, isLoading } = useSelector(selectPost);

  const submitHandler = async () => {
    dispatch(getPosts());
  };

  const userHandler = async () => {
    dispatch(loadUser());
  };

  return (
    <Fragment>
      <Navbar />
      <h1>Profile Page</h1>
      <Link to={"/"}>Home</Link>
      <br /> <br /> <br />
      <button onClick={submitHandler}>Click Me</button>
      {!isLoading &&
        post.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <br />
            <p>{post.description}</p>
          </div>
        ))}
      <br /> <br /> <br /> <br />
      <button onClick={userHandler}> user info</button>
    </Fragment>
  );
}

export default Profile;
