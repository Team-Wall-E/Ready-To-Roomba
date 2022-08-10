import React from 'react';
import { connect } from 'react-redux';

class ProductReviews extends React.Component {
  constructor(props) {
    super(props);
    this.rating = this.rating.bind(this);
  }

  rating(rating) {
    if (rating === 5) {
      return <span className='review-stars'>★★★★★</span>;
    } else if (rating === 4) {
      return <span className='review-stars'>★★★★</span>;
    } else if (rating === 3) {
      return <span className='review-stars'>★★★</span>;
    } else if (rating === 2) {
      return <span className='review-stars'>★★</span>;
    } else if (rating === 1) {
      return <span className='review-stars'>★</span>;
    }
  }

  render() {
    if (!this.props.reviews) {
      return (
        <div>
          <h2>This product has no reviews.</h2>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Reviews</h2>
          <div>
            {this.props.reviews.map((review) => (
              <div key={review.id}>
                <div>
                  <div>
                    {this.rating(review.starRating)}
                    <h3 style={{ display: 'inline-block' }}>{review.title}</h3>
                  </div>
                  <p>By {review.owner}</p>
                  <p>{review.customerReview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    reviews: state.product.reviews, // accessing the product reducer
  };
};

export default connect(mapState, null)(ProductReviews);
