import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import MainPage from "../containers/MainPage";
import UserInfoPage from "../containers/UserInfoPage";
import UsersStatPage from "../containers/UsersStatPage";

const MainRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path={"/"} component={MainPage} exact />
        <Route path={"/users_stat"} component={UsersStatPage} exact />
        <Route path={"/users_stat/:id"} component={UserInfoPage} />
        <Route path={"*"}>
          <Redirect to={"/"} />
        </Route>
      </Switch>
    </Router>
  );
};

export default MainRoutes;
