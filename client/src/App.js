import * as React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes, staffRouter } from "./routes/routes";
import "~/assets/GlobalStyle.scss"
import { RequireAuth } from "./pages/auth/RequireAuth";
import LoginPage from "./pages/auth/LoginPage";
import { useToken } from "./store";
import HomePage from "./pages/user/HomePage";
import UserLayout from "./layouts/UserLayout/UserLayout";

function App() {
  const {token, setToken} = useToken()
  return (
    <>
    <div className="wrapper">
      <Router>
      <Routes>
        {
          !token ? 
          publicRoutes.map((route, index) => {
            let Layout = route.layout
            return (
              <Route key={index} path={route.path} element={
                <Layout>
                  <route.component />
                </Layout>
              } />
            )
          })
          : token && token.account.quyen == 1 ?
            privateRoutes.map((route, index) => {
            let Layout = route.layout
            return (
              <Route key={index} path={'/admin/' + route.path} element={
                  <Layout>
                    <route.component />
                  </Layout>
  
              } />
            )
          })
          : token && token.account.quyen == 2 ?
          staffRouter.map((route, index) => {
            let Layout = route.layout
            return (
              <Route key={index} path={'staff' + route.path} element={
                <RequireAuth>
                <Layout>
                  <route.component />
                </Layout>
              </RequireAuth>
              } />
            )
          })
          :
          <Route  path='/' element={
            <UserLayout>
              <HomePage/>
            </UserLayout>

        } />
        }
      </Routes>
      
    </Router>

    </div>
    </>
    
    
  );
}
export default App;