import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar";

function Home() {
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch("https://164.92.236.75/employees/all/")
  //     .then(response => response.json())
  //     .then(data => setData(data));
  // }, []);
  // useEffect(() => {
  //   fetch("https://164.92.236.75/terms/")
  //     .then(response => response.json())
  //     .then(data => console.log(data));
  // }, []);

  return (
    <Fragment>
      <Navbar />
      <h1>Home Page</h1>
      <div>
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
        <br /> <br />
        <hr />
        <br /> <br />
        <hr />
        <Link to={"/profile"}>Profile</Link>
        <br /> <br />
        {/* {data &&
          data.map(data => 
          <img key={data.id} src={'http://164.92.236.75' + data.avatar} alt='s' />)}
        {data && data.map(data => <p key={data.id}>{data.description}</p>)} */}
      </div>
    </Fragment>
  );
}

export default Home;
