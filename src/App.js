import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import { connect } from "react-redux";
import * as ChatActions from "./Store/Actions/chatActions";
import React from "react";
import Auth from "./Components/Pages/Auth";
import "bootstrap/dist/css/bootstrap.min.css";

function RequireAuth({ children }) {
  let location = useLocation();
  if (true) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
class App extends React.Component {
  componentDidMount() {
    this.props.setupSocket();
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <div>protected</div>
                </RequireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.auth,
  ...state.chat,
});

const mapDispatchToProps = (dispatch) => ({
  setupSocket: () => {
    dispatch(ChatActions.setupSocket());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
