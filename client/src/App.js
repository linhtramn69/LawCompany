import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes/routes";
import 'antd/dist/reset.css';
import "~/assets/GlobalStyle.scss"
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
function App() {

  let role = 1;
  let routes = publicRoutes;
  let path = '';

  if (role !== 0) {
    routes = privateRoutes;
  }
  switch (role) {
    case 1: {
      path = '/admin';
      break;
    }
    case 2: {
      path = '/law';
      break;
    }
    default:
      path = ''
  }

  return (
    <Router>
      <div className="wrapper">
        <Routes>
          {routes.map((route, index) => {
            let Layout = route.layout;
            return (
              <Route
                key={index}
                path={path + route.path}
                element={
                  <Layout>
                    <route.component role={role} />
                  </Layout>
                } />
            )
          })}
        </Routes>
      </div>
    </Router>

  );
}

export default App;
