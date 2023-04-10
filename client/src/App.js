import * as React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes, staffRouter } from "./routes/routes";
import "~/assets/GlobalStyle.scss"

import HomePage from "./pages/user/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import { RequireAuth } from "./pages/auth/RequireAuth";
import LayoutAdmin from "./layouts/LayoutAdmin";
import UserLayout from "./layouts/UserLayout/UserLayout";
import { useStore } from "./store";
import Dashboard from "./pages/managers/dashboard";


export default function App() {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = route.layout
            return (
              <Route key={index} path={route.path} element={
                <Layout>
                  <route.component />
                </Layout>
              } />
            )
          })}
          {privateRoutes.map((route, index) => {
            let Layout = route.layout
            return (
              <Route key={index} path={'/admin/' + route.path} element={
                <RequireAuth>
                  <Layout>
                    <route.component />
                  </Layout>
                </RequireAuth>

              } />
            )
          })}
          {staffRouter.map((route, index) => {
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
          })}

        </Routes>
      </Router>

    </div>
  );
}