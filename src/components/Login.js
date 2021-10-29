import "../App.css";
import "../style.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    if (e.target.id === "username") {
      setUserName(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://jason-11.herokuapp.com/mongoLogin", {
        user_name: userName,
        password: password,
      })
      .then((res) => {
        if (res.data.length <= 0) {
          alert("username/password not correct!!");
        } else {
          props.logIn();
          props.userInfoSet({ userName: userName });
          history.push("/ProductList");
        }
      })
      .catch((err) => console.log(err));
  };


  return (
    <div className="container">
      <div className="d-flex justify-content-center h-100">
        <div className="card">
          <div className="card-header">
            <h3>Kijijo Sign In</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  placeholder="username"
                  value={userName}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-key"></i>
                  </span>
                </div>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <div className="row align-items-center remember">
                <input type="checkbox" />
                Remember Me
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Login"
                  className="btn float-right login_btn"
                />
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              Don't have an account?
              <Link to={!props.loggedIn ? "/Signup" : "#"}>Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
