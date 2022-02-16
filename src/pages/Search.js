import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import StarRating from "../components/StarRating";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/search.css";

class Search extends Component {
  state = {
    ships: [],
    query: ""
  };
  componentDidMount() {
    this.fetchShips();
  }
  fetchShips = async () => {
    const { data } = await axios.get(
      `https://cruisebuddy-backend.herokuapp.com/ships/`,
      {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("AUTH_TOKEN")
      }
    );

    this.setState({ ships: this.filterShipsByTerm(data.ships) });
  };
  filterShipsByTerm = ships => {
    const { match } = this.props;
    const searchTerm = match.params.searchTerm || "";
    return ships.filter(ship =>
      ship.reviews.some(({ body = "" }) =>
        body.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  handleQueryChange = e => this.setState({ query: e.target.value });
  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    this.props.history.push(`/search/${query}`);
    window.location.reload(false);
  };

  render() {
    const { ships } = this.state;
    const { query } = this.state;
    return (
      <>
        <div className="search-page-container">
          <div className="search-container">
            <form
              className="input-group mb-3 search-input-group"
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
            <div className="search-sort-container">
              <div className="search-sort"></div>
              <div className="search-sort">Showing {ships.length} results</div>
            </div>
          </div>
          <div className="container">
            {ships.map(ship => {
              const firstReview = ship.reviews[0] || {};
              const ratingAverage =
                ship.reviews.reduce((acc, review) => acc + review.rating, 0) /
                ship.reviews.length;
              return (
                <>
                  <div className="card mb-3">
                    <Link to={`/ship/${ship.id}`}>
                      <div className="row no-gutters">
                        <div className="col-md-4">
                          <img
                            src={ship.url}
                            className="card-img search-image"
                            alt="Ship"
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title search-title">
                              {ship.cruise_name.name} {ship.name}
                            </h5>
                            <div className="search-ratings-reviews">
                              <div className="search-ratings">
                                {" "}
                                <StarRating value={ratingAverage} noHover />
                              </div>
                              <div className="search-reviews">
                                <p className="card-text review-text">
                                  <small className="text-muted review-text">
                                    {ship.reviews.length} Reviews
                                  </small>
                                </p>
                              </div>
                            </div>
                            <p className="card-text ship-preview">
                              {ship.description.substring(
                                0,
                                ship.description.indexOf(".")
                              )}
                            </p>
                            <p className="card-text desc-preview">
                              <small className="text-muted">
                                "{firstReview.body}"
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(Search);
