import React from "react";
import axios from "axios";
import { get } from "lodash";
import { Link } from "react-router-dom";
import Gallery from "../components/Gallery";
import StarRating from "../components/StarRating";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "semantic-ui-css/semantic.min.css";
import "../styles/ship.css";
import "../styles/commentgroup.css";
import { Comment, List, Form, Button, TextArea } from "semantic-ui-react";

class Ship extends React.Component {
  state = {
    photoIndex: 0,
    isOpen: false,
    ship: {},
    text: ""
  };

  componentDidMount() {
    this.fetchShip();
  }

  fetchShip = async () => {
    const shipId = this.props.match.params.id;
    const { data } = await axios.get(
      `https://cruisebuddy-backend.herokuapp.com/ships/${shipId}`,
      {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("AUTH_TOKEN")
      }
    );
    this.setState({ ship: data });
  };

  render() {
    const { ship } = this.state;
    const allRatings =
      ship.reviews &&
      ship.reviews.map(review => {
        return review.rating;
      });
    const ratingLength = allRatings && allRatings.length;
    const ratingSum = allRatings && allRatings.reduce((a, b) => a + b, 0);
    const averageRating = ratingSum / ratingLength;
    const { ship_images = [] } = ship;
    const { photoIndex, isOpen } = this.state;
    const mainSrc = get(ship_images, [photoIndex, "url"], "");
    const nextSrc = get(
      ship_images,
      [(photoIndex + 1) % ship_images.length, "url"],
      ""
    );
    const prevSrc = get(
      ship_images,
      [(photoIndex + ship_images.length - 1) % ship_images.length, "url"],
      ""
    );
    return (
      <>
        <div className="carousel-wrapper">
          <Gallery key={ship_images.length} shipImages={ship_images} />
          <div className="button-wrapper ">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => this.setState({ isOpen: true })}
            >
              View More
            </button>
            {isOpen && (
              <Lightbox
                mainSrc={mainSrc}
                nextSrc={nextSrc}
                prevSrc={prevSrc}
                onCloseRequest={() => this.setState({ isOpen: false })}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex:
                      (photoIndex + ship_images.length - 1) % ship_images.length
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + 1) % ship_images.length
                  })
                }
              />
            )}
          </div>
        </div>
        <div className="container ship-page-container">
          <div className="ship-description-body">
            <div className="reviews-header">
              <h1>
                {get(ship.cruise_line, "name", "")} {ship.name}
              </h1>
            </div>
            <div className="ship-description-items">
              <div className="ship-description-paragraph">
                <div className="ship-rating-wrapper">
                  <div className="ship-rating-rating">
                    <StarRating value={averageRating} noHover />{" "}
                  </div>
                  <div className="ship-rating-reviews">
                    <p>{ship.reviews && ship.reviews.length} Reviews</p>{" "}
                  </div>
                </div>
                <div className="ship-description-paragraph-text">
                  {get(ship, "description", "")}
                </div>
              </div>
              <div className="ship-voyages">
                <div className="ship-voyages-title">
                  <h2>Cruise Itineraries</h2>
                </div>
                <div className="ship-voyages-items">
                  <List>
                    {ship.voyages &&
                      ship.voyages.slice(0, 4).map(voyage => {
                        return (
                          <List.Item>
                            <List.Header>{voyage.description}</List.Header>
                            <p>Ports: {voyage.ports}</p>Price: $
                            {voyage.price.toLocaleString()}
                          </List.Item>
                        );
                      })}
                  </List>
                </div>
              </div>
            </div>
          </div>
          <div className="reviews-header">
            <h2 className="ui header">Reviews</h2>
          </div>
          {ship.reviews &&
            ship.reviews.map(review => {
              return (
                <div className="review-group-body">
                  <Comment.Group className="review-group">
                    <Comment className="comment-comment">
                      <Comment.Avatar
                        className="comment-avatar"
                        src={review.user_profile.url}
                      />
                      <Comment.Content className="comment-content">
                        <Comment.Author className="comment-author" as="a">
                          {review.user_profile.first_name}{" "}
                          {review.user_profile.last_name.charAt(0)}
                        </Comment.Author>
                        <Comment.Metadata className="comment-metadata">
                          <div>{review.created_at}</div>
                        </Comment.Metadata>

                        <Comment.Text className="comment-text">
                          {" "}
                          <StarRating
                            className="stars-comments"
                            value={review.rating}
                            noHover
                          />
                        </Comment.Text>
                        <Comment.Text className="review-body">
                          {review.body}
                        </Comment.Text>
                        <p>
                          {review.ship_image ? (
                            <img
                              className="review-image"
                              src={review.ship_image}
                            />
                          ) : null}
                        </p>
                        <Comment.Actions>
                          <Comment.Action className="review-reply">
                            Reply
                          </Comment.Action>
                        </Comment.Actions>
                        <Comment.Text>
                          <div className="comment-comments">COMMENTS:</div>
                        </Comment.Text>

                        <div className="review-comments">
                          {review.comments.map(comment => {
                            return (
                              <Comment>
                                <Comment.Avatar
                                  src={comment.user_profile.url}
                                />
                                <Comment.Content>
                                  <Comment.Author as="a">
                                    {comment.user_profile.first_name}{" "}
                                    {review.user_profile.last_name.charAt(0)}
                                  </Comment.Author>
                                  <Comment.Metadata>
                                    <div>{comment.created_at}</div>
                                  </Comment.Metadata>
                                  <Comment.Text>{comment.body}</Comment.Text>
                                  <Comment.Actions>
                                    <Comment.Action>Reply</Comment.Action>
                                  </Comment.Actions>
                                </Comment.Content>
                              </Comment>
                            );
                          })}
                        </div>
                      </Comment.Content>
                    </Comment>
                    <Form reply>
                      {/* <Form.TextArea
                        label="About"
                        placeholder="Comment on this review..."
                      /> */}

                      {/* <Button
                        class="ui button"
                        size="tiny"
                        content="Add Reply"
                        labelPosition="left"
                        icon="edit"
                      /> */}
                    </Form>
                  </Comment.Group>
                </div>
              );
            })}
          <div>
            <Link to="/Review">
              <Button variant="outline-light btn-sm">Write a Review</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
export default Ship;
