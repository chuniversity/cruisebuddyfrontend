import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/Review.css";
import StarRating from "../components/StarRating";
import MyDropzone from "../components/MyDropzone";

const CATEGORIES = [
  { label: "Fitnesss Rating", value: "fitnessRating" },
  { label: "Lodging", value: "lodging" },
  { label: "Dining", value: "dining" },
  { label: "Public Areas", value: "publicAreas" },
  { label: "Entertainment", value: "entertainmentRating" }
];

class Review extends React.Component {
  static contextType = AuthContext;
  state = {
    categories: {
      fitnessRating: "1",
      lodging: "1",
      excursions: "1",
      dining: "1",
      service: "1",
      publicAreas: "1",
      value: "1",
      entertainmentRating: "1"
    },
    averageRating: 0,
    shipName: "",
    reviewBody: "",
    shipImage: ""
  };

  handleInputChange = field => e => this.setState({ [field]: e.target.value });

  fileSelectedHandler = event =>
    this.setState({ shipImage: event.target.files[0] });

  handleSubmitReview = async e => {
    e.preventDefault();
    const { shipName, averageRating, reviewBody, shipImage } = this.state;
    const shipData = { shipName, shipImage };
    const reviewData = { body: reviewBody, rating: averageRating };
    const formData = new FormData();
    Object.keys(shipData).forEach(key =>
      formData.append(`ship[${key}]`, shipData[key])
    );
    Object.keys(reviewData).forEach(key =>
      formData.append(`review[${key}]`, reviewData[key])
    );
    await axios.post("https://cruisebuddy-backend.herokuapp.com/reviews", formData, {
      headers: {
        "content-type": "application/json",
        Authorization: sessionStorage.getItem("AUTH_TOKEN")
      }
    });
    this.props.history.push("/ReviewThanks");
  };

  handleRatingSelection = stateId => val => {
    const { categories } = this.state;
    const newCategories = { ...categories, [stateId]: val };
    const ratings = Object.values(newCategories);
    const averageRating = Math.ceil(
      ratings.reduce((acc, rating) => acc + +rating, 0) / ratings.length
    );
    this.setState({ categories: newCategories, averageRating });
  };
  redirect() {
    this.props.history.push("/");
  }

  render() {
    const { averageRating, categories } = this.state;

    return (
      <div className="r-img">
        <div id="container">
          <div className="r-t">
            <h4
              style={{
                padding: "4rem",
                color: "white",
                fontFamily: "lato, sans-serif"
              }}
            >
              We'd love to hear your opinion. Your feedback helps fellow
              cruisers choose the best cruise for their needs. Thank you
            </h4>
          </div>
          <Form className="r-input input-group-sm mb-3">
            <Form.Label className="f-l" style={{ padding: "1rem" }}>
              Which ship were you on?
            </Form.Label>
            <Form.Control
              style={{ width: "461px" }}
              onChange={this.handleInputChange("shipName")}
              placeholder="Begin typing your ship name…"
            />

            <Form.Label className="f-l" style={{ padding: "1rem" }}>
              Which itinerary did you go on?
            </Form.Label>
            <Form.Control style={{ width: "461px" }} placeholder="Itinerary" />

            <Form.Label className="f-l" style={{ padding: "1rem" }}>
              On which dates did you cruise?
            </Form.Label>
            <Form.Control
              style={{ width: "461px" }}
              type="date"
              placeholder=""
            />

            <div className="overal-rating">
              <h4>Choose Overal Rating</h4>
              <StarRating
                classname="review-rating"
                style={{ height: "52px" }}
                value={averageRating}
              />
            </div>
            <h4 style={{ textAlign: "center" }}>Rate item by item:</h4>
            {CATEGORIES.map(({ value, label }) => (
              <div className="overal-rating">
                <label style={{ font: "lato, sans-serif" }}>{label}</label>
                <StarRating
                  classname="review-rating"
                  category={value}
                  value={categories[value]}
                  handleRating={this.handleRatingSelection(value)}
                />
              </div>
            ))}
          </Form>

          <h4 style={{ textAlign: "center" }}> Write your review:</h4>
          <textarea
            style={{ borderRadius: "5px", width: "460px", height: "150px" }}
            aria-label="With textarea"
            onChange={this.handleInputChange("reviewBody")}
          ></textarea>
          <MyDropzone fileSelectedHandler={this.fileSelectedHandler} />
          <button onClick={this.handleSubmitReview} class="btn btn-primary">
            Post Review
          </button>
        </div>
      </div>
    );
  }
}
export default Review;
