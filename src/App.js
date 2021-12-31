import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import auth from "./Store/Reducers/authReducer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/" element={<div>root</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => ({
  ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
