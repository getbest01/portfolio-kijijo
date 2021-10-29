import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProductLoad from "./components/ProductLoad";
import Nav from "./components/Nav";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";

import { useState, useEffect } from "react";
import axios from "axios";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [prodList, setProdList] = useState({});
  const [eachProd, setEachProd] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const getData = (searchTerm) => {
    axios
      .get("https://jason-11.herokuapp.com/mongoProdQry", searchTerm)
      .then((res) => {
        setProdList(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData({});
  }, []);

  const logIn = () => {
    setLoggedIn(true);
  };

  const logOut = () => {
    setLoggedIn(false);
    setUserInfo({});
  };

  const userInfoSet = (userArg) => {
    setUserInfo(userArg);
  };

  const eachProdSet = (id) => {
    setEachProd(prodList.data.filter((data) => data._id === id));
  };

  return (
    <Router>
      <div className="App">
        <Nav
          getData={getData}
          loggedIn={loggedIn}
          logOut={logOut}
          userName={userInfo.userName}
        />
        <Switch>
          <Route exact path="/">
            <Login logIn={logIn} userInfoSet={userInfoSet} />
          </Route>
          <Route path="/Login">
            <Login logIn={logIn} userInfoSet={userInfoSet} />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/ProductReg">
            <ProductLoad userInfo={userInfo} getData={getData} />
          </Route>
          <Route path="/ProductList">
            <ProductList
              data={prodList.data}
              eachProdSet={eachProdSet}
              userInfo={userInfo}
              key={5}
            />
          </Route>
          <Route path="/ProductDetail">
            <ProductDetail
              data={eachProd}
              userInfo={userInfo}
              getData={getData}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
