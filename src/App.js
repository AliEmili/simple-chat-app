import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as ChatActions from "./Store/Actions/chatActions";
import React from "react";

class App extends React.Component {
  componentDidMount() {
    this.props.setupSocket();
  }
  render() {
    return (
      <div className="App">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (this.props.socket) {
              this.props.socket.send(
                JSON.stringify({
                  type: "hello",
                  data: "world",
                })
              );
            }
          }}
        >
          Send message
        </button>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<div>Login</div>} />
            <Route path="/" element={<div>root</div>} />
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
