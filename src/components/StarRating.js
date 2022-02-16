import React, { Fragment } from "react";
import classNames from 'classnames';

const StarRating = ({ value, handleRating, noHover }) => {
   return(
      <div className="star-rating">
         {['5', '4', '3', '2', '1'].map(num => (
            <Fragment key={num}>
               <label onClick={_ => handleRating && handleRating(num)} for={`${num}-stars`} className={classNames("star", { active: num <= value, noHover: noHover })}>&#9733;</label>
            </Fragment>
         ))}
      </div>
 )};
export default StarRating








