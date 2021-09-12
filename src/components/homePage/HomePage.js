import React, { useEffect, useState, useContext } from "react";
import { Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import { logout, isLogin } from "../../utils";
import { capitalizeFirstLetter } from "../../utils/service";
import { PageContext } from "../../PageContextProvider";
function Home() {
  const { user } = useContext(PageContext);
  const history = useHistory();
  const [isLogIn, setIsLogIn] = useState(false);
  const [loginUserName, setLoginUserName] = useState(false);
  const signOut = () => {
    logout();
    setIsLogIn(false);
    history.push("/");
  };
  useEffect(() => {
    const isValue = isLogin();
    if (isValue) {
      setLoginUserName(JSON.parse(localStorage.getItem("jwt")));
      setIsLogIn(isValue);
    }
  }, [user[0]]);
  return (
    <div>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={[]}>
        {isLogIn ? (
          <React.Fragment>
            <Menu.Item key="2" onClick={signOut}>
              Sign out
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/challenge">Add new challenge</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="5">
              Hello, {capitalizeFirstLetter(loginUserName.user.name)} !
            </Menu.Item>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {<Menu.Item key="6">Hackathon Application</Menu.Item>}
          </React.Fragment>
        )}
      </Menu>
    </div>
  );
}

export default Home;
