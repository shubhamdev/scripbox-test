import React from "react";
import { Link, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";
import { Layout } from "antd";
const { Header, Content } = Layout;
const LoginPage = React.lazy(() => import("../components/loginPage/LoginPage"));
const ChallengesPage = React.lazy(() =>
  import("../components/challengesPage/ChallengesPage")
);
const DashboardPage = React.lazy(() =>
  import("../components/dashboardPage/DashboardPage")
);

const HomePage = React.lazy(() => import("../components/homePage/HomePage"));
function NoMatch() {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        padding: "1rem",
        height: "90vh",
      }}
    >
      <h3>
        No match for this route
        <Link to="/"> Login</Link>
      </h3>
    </div>
  );
}

function Routers() {
  return (
    <Layout>
      <Header>
        <HomePage />
      </Header>
      <Content style={{ height: "100bh" }}>
        <Switch>
          <PublicRoute
            restricted={false}
            component={LoginPage}
            path="/"
            exact
          />
          <PrivateRoute component={ChallengesPage} path="/challenge" exact />
          <PrivateRoute component={DashboardPage} path="/dashboard" exact />
          <PublicRoute path="*">
            <NoMatch />
          </PublicRoute>
        </Switch>
      </Content>
    </Layout>
  );
}

export default Routers;
