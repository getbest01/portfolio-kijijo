import "../App.css";
import "../style.css";
import axios from "axios";
import { useState } from "react";

function Signup(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullname] = useState("");
  const [age, setAge] = useState("");

  const handleChange = (e) => {
    if (e.target.id === "username") {
      setUserName(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    } else if (e.target.id === "fullname") {
      setFullname(e.target.value);
    } else if (e.target.id === "age") {
      setAge(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://jason-11.herokuapp.com/mongoUserAdd", {
        fullname: fullName,
        user_name: userName,
        password: password,
        age: age
      })
      .then((res) => {
        if (res.data.length <= 0) {
          alert("User registration fail");
        } else {
            if (res.data === 'already exists') {
                alert(`Sign up failed. User name ${userName} already exists!`)
            }
            else {alert(`Sign up successful!`)}
        } 
      })
      .catch((err) => console.log(err));
  };


  return (
    <div className="container">
      <div className="d-flex justify-content-center h-100">
        <div className="card">
          <div className="card-header">
            <h3>Kijijo Sign Up</h3>
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
                  id="fullname"
                  type="text"
                  className="form-control"
                  placeholder="fullname"
                  value={fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
                <input
                  id="age"
                  type="number"
                  className="form-control"
                  placeholder="age"
                  value={age}
                  onChange={handleChange}
                  min={1}
                  max={150}
                  required
                />
              </div>

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
                  required
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
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Signup"
                  className="btn float-right login_btn"
                />
              </div>
            </form>
          </div>
          <div className="card-footer"></div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
