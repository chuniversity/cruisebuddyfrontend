import React, { createContext, Component } from "react";
import axios from "axios";

export const AuthContext = createContext({});

export class AuthContextProvider extends Component {
  state = { token: "" };

  componentDidMount() {
    this.authenticate();
  }

  authenticate = async () => {
    const { data } = await axios.post("/authenticate", {
      email: "example@mail.com",
      password: "123123123"
    });
    this.setState({ token: `Bearer ${data.auth_token}` });
  };

  render() {
    const { token } = this.state;
    const { children } = this.props;
    return (
      <AuthContext.Provider value={{ token }} key={token}>
        {children}
      </AuthContext.Provider>
    );
  }
}
