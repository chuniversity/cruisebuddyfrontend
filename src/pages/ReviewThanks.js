import React from "react";
import "../styles/Review.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class ReviewThanks extends React.Component {
  render() {
    return (
      <>
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
                Thanks for submitting your review! Your feedback helps fellow
                cruisers choose the best cruise for their needs.
              </h4>
              <div className="thanks-button">
                <Link to="/">
                  <Button>Return to the Home page</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default ReviewThanks;
