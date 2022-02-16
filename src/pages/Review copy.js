import React from 'react'
import '../styles/Review.css'
import {Form } from 'react-bootstrap'
import StarRating from '../components/StarRating';
import classNames from 'classnames';

  class Review extends React.Component{
    state={
      fitnessRating : "1",
      lodging : "1",
      excursions : "1",
      dining : "1",
      service : "1", 
      publicAreas : "1",
      value: "1",
      entertainmentRating : "1",
      avgRating: 0,
    }
    handleRatingSelection = stateId => val => {
      const { avgRating: _, ...otherState } = this.state;
      const ratings = Object.values({ ...otherState, [stateId]: val });
      const averageRating = Math.ceil(ratings.reduce((acc, rating) => acc + +rating, 0) / ratings.length);
      this.setState({ [stateId]: val, averageRating });
    }
    render(){
      const { averageRating } = this.state;
    const categories = [
      { label: 'Fitnesss Rating', value: 'fitnessRating' },
      { label: 'Lodging', value: 'lodging' },
      { label: 'Excursions', value: 'excursions' },
      { label: 'Dining', value: 'dining' },
      { label: 'Service', value: 'service' },
      { label: 'Public Areas', value: 'publicAreas' },
      { label: 'Value', value: 'value' },
      { label: 'Entertainment', value: 'entertainmentRating'},
    ]
    

  return(
    <div>
    <div className="reviews-img">

      <h1>We’d love to hear your opinion. Your feedback helps 
          fellow cruisers choose the best cruise for their needs.  
          Thank you. </h1> 
    

          <Form className="review-input">
            <div controlId="formGrid">
              <Form.Label>Witch ship were you on?</Form.Label>
              <Form.Control placeholder="Begin typing your ship name…" />
            </div>

            <div controlId="formGrid">
              <Form.Label>Which itinerary did you go on?</Form.Label>
              <Form.Control placeholder="Itinerary" />
            </div>
            <div controlId="formGrid">
              <Form.Label>On which dates did you cruise?</Form.Label>
              <Form.Control type="date" placeholder="" />
            </div>
          </Form>


        </div>
        <div className="main-review-page">

          <label>Choose Overal Rating</label>

          <StarRating value={averageRating} />
           
            {categories.map(({ value, label }) => (
              <div>
                <label>{label}</label>
                <StarRating category={value} value={this.state[value]} handleRating={this.handleRatingSelection(value)} />
              </div>
              ))}
             </div>
             
         </div>
    )
    
  }

}
export default Review