import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import "../styles/homemenu.css";
import "../styles/card-style.css";

class Home extends Component {
  state = { query: "" };
  handleQueryChange = e => this.setState({ query: e.target.value });
  handleSubmit = e => {
    e.preventDefault();
    const { query, ...queryParams } = this.state;
    const redirectPath = Object.keys(queryParams).reduce((acc, paramKey) => {
      const paramValue = queryParams[paramKey];
      if (!paramValue) return acc;
      return acc
        ? acc + `&${paramKey}=${paramValue}`
        : `?${paramKey}=${paramValue}`;
    }, "");
    this.props.history.push(`/search/${query}${redirectPath}`);
  };
  handleFilterChange = field => e => this.setState({ [field]: e.target.value });
  render() {
    const { query } = this.state;
    return (
      <>
        <div className="hero-div">
          <div className="home-quote">
            See reviews from real cruisers to help you choose your next best
            cruise.
          </div>
          <form
            className="input-group mb-3 home-input-group"
            onSubmit={this.handleSubmit}
          >
            <input
              style={{ borderRadius: "50px 0 0 50px", backgroundColor: "#" }}
              type="text"
              className="form-control"
              placeholder="Search for Reviews"
              aria-describedby="basic-addon2"
              value={query}
              onChange={this.handleQueryChange}
            />
            <div className="input-group-append">
              <button
                style={{ borderRadius: " 0 50px 50px 0" }}
                className="btn btn-primary"
                type="button"
                onClick={this.handleSubmit}
              >
                <i class="fas fa-search"></i>
              </button>
            </div>
          </form>
        </div>

        <div className="container">
          <div className="deal-container">
            <div className="home-deals">
              <h2>Hot Deals!</h2>
            </div>
            <div className="card-deck home-deck">
              <div className="card home-deck-card">
                <img
                  src="http://chunis.org/images/ships/breeze1.jpg"
                  className="card-img-top"
                  alt="Ship"
                />
                <div className="card-body">
                  <h5 className="card-title">Carnival Breeze</h5>
                  <p className="card-text">
                    Carnival Horizon – which set sail in April 2018 – is one of
                    the fleet's newer ships. It accommodates 1,450 crew members
                    and a maximum of 5,101 passengers, and it offers a plethora
                    of amenities for travelers of all ages.{" "}
                  </p>
                  <Link to={`/ship/3`}>
                    <button type="button" className="btn btn-primary btn-sm">
                      Read Reviews
                    </button>
                  </Link>
                </div>
              </div>
              <div className="card home-deck-card">
                <img
                  src="http://chunis.org/images/ships/symphonyoftheseas1.jpg"
                  className="card-img-top"
                  alt="Ship"
                />
                <div className="card-body">
                  <h5 className="card-title">Symphony of the Seas</h5>
                  <p className="card-text">
                    The 6,680-passenger Symphony of the Seas is one of the
                    newest ships in Royal Caribbean's Oasis fleet. This massive
                    ship – which set sail in 2018 and it currently boasts being
                    the largest cruise ship in the world.{" "}
                  </p>
                  <Link to={`/ship/8`}>
                    <button type="button" className="btn btn-primary btn-sm">
                      Read Reviews
                    </button>
                  </Link>
                </div>
              </div>
              <div className="card home-deck-card">
                <img
                  src="http://chunis.org/images/ships/disneydream1.jpg"
                  className="card-img-top"
                  alt="Ship"
                />
                <div className="card-body">
                  <h5 className="card-title">Disney Dream</h5>
                  <p className="card-text">
                    Highlights include the 765-foot AquaDuck water coaster, a
                    virtual sports simulator (for an extra fee) and theatrical
                    performances that bring Disney animated favorites – like
                    'Beauty and the Beast' – to life.
                  </p>
                  <Link to={`/ship/14`}>
                    <button type="button" className="btn btn-primary btn-sm">
                      Read Reviews
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Home;
