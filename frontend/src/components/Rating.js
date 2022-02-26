import React from 'react';
import { Badge } from 'react-bootstrap';

const Rating = ({rating,ratingNumber}) => {
  return (
      <div>
        <i class={rating>= 1? "fas fa-star": rating >=.5? "fas fa-star-half-alt":"far fa-star"}></i>
        <i class={rating>= 2? "fas fa-star": rating >=1.5? "fas fa-star-half-alt":"far fa-star"}></i>
        <i class={rating>= 3? "fas fa-star": rating >=2.5? "fas fa-star-half-alt":"far fa-star"}></i>
        <i class={rating>= 4? "fas fa-star": rating >=3.5? "fas fa-star-half-alt":"far fa-star"}></i>
        <i class={rating>= 5? "fas fa-star": rating >=4.5? "fas fa-star-half-alt":"far fa-star"}></i>
        <h6>
          Total = <Badge bg="secondary">{ratingNumber}</Badge> Rating
        </h6>
      </div>
      
  );
};

export default Rating;
