import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const LoginUser = (event) => {
    console.log("adding");
    axios
      .post(`http://localhost:8070/user/login`, user)
      .then((result) =>{ 
        if(result.data.profile.accountType==="admin"){
            localStorage.setItem("userData",JSON.stringify(result.data.profile))
            navigate("/Admin");
        }
        else if (result.data.profile.status) {
            localStorage.setItem("userData",JSON.stringify(result.data.profile))
          navigate("/");
        } else {
            localStorage.setItem("userId",result.data.profile.id)
          navigate("/Register");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" for="exampleCheck1">
                Check me out
              </label>
            </div>
            
          </form>
          <button  className="btn btn-primary"
            onClick={()=>LoginUser()}>
              Submit
            </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
