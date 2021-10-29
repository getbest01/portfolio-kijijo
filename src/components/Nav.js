import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Nav = (props) => {
  const history = useHistory();

  const [searchStr, setSearchStr] = useState("");

  const handleChange = (e) => {
    setSearchStr(e.target.value);
  };

  const searchBtn = () => {
    props.getData({ params: { searchStr: searchStr } });
  };

  const logOutSet = () => {
    props.logOut();
    history.push("/Login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul>
        <li className="navbar-brand">
          <Link to={!props.loggedIn ? "login": "#"}>Login</Link>
        </li>
        <li className="navbar-brand">
          <Link to={!props.loggedIn ? "Signup" : "#"}>Sign up</Link>
        </li>
        <li className="navbar-brand">
          <Link to={props.loggedIn ? "ProductList" : "#"}>Product List</Link>
        </li>
        <li className="navbar-brand">
          <Link to={props.loggedIn ? "ProductReg" : "#"}>Product Post</Link>
        </li>
      </ul>
      <ul>
        <li className="navbar-brand">
          <input type="text" value={searchStr} onChange={handleChange} disabled={!props.loggedIn}/>
        </li>
        <li className="navbar-brand">
          <button className="btn btn-primary" onClick={searchBtn} disabled={!props.loggedIn}>
            Search
          </button>
        </li>
        <li className="navbar-brand">
          <button
            className="btn btn-primary"
            disabled={!props.loggedIn}
            onClick={props.getData}
          >
            Reload All
          </button>
        </li>
        <li className="navbar-brand">
          <button
            className="btn btn-primary"
            disabled={!props.loggedIn}
            onClick={logOutSet}
          >
            Log out
          </button>
        </li>

        <li className="navbar-brand" hidden={!props.loggedIn}>
          <span className="input-group-text">
            <i className="fas fa-user"></i>
          </span>
        </li>
        <li className="navbar-brand" hidden={!props.loggedIn}>
          <span className="input-group-text">{props.userName}</span>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
