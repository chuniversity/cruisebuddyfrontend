import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Ship from "./pages/Ship";
import Footer from "./components/Footer";
import Review from "./pages/Review";
import ReviewThanks from "./pages/ReviewThanks";
import NavigationBar from "./components/NavigationBar";
import "./styles/global.css";

class App extends Component {
  state = { ship: [] };
  render() {
    const { ships } = this.state;
    return (
      <AuthContextProvider>
        <BrowserRouter>
          <NavigationBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/search/:searchTerm?"
              render={() => <Search ships={ships} />}
            />
            <Route path="/ship/:id" component={Ship} />
            <Route exact path="/review" component={Review} />
            <Route exact path="/reviewthanks" component={ReviewThanks} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    );
  }
}

export default App;
