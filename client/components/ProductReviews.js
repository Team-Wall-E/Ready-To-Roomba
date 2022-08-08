import React from "react";
import { connect } from "react-redux";

// import { fetchReviewsThunk } from "../store/reviews";

class ProductReviews extends React.Component {
    constructor(props) {
        super(props)
        this.rating = this.rating.bind(this);
    }

    rating(rating) {
        if (rating === 5) {
            return (
                <h2>⭐⭐⭐⭐⭐</h2>
            );
        } else if (rating === 4) {
            return (
                <h2>⭐⭐⭐⭐</h2>
            );
        } else if (rating === 3) {
            return (
                <h2>⭐⭐⭐</h2>
            );
        } else if (rating === 2) {
            return (
                <h2>⭐⭐</h2>
            );
        } else if (rating === 1) {
            return (
                <h2>⭐</h2>
            )
        }
    }

    render () {
        console.log('🍎', this.props);
        console.log('🤢', this.props.reviews)
        if (!this.props.reviews) {
            return (
                <div>
                    <h1>🫠</h1>
                    <h2>This product has no reviews.</h2>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Reviews</h1>
                    <div>
                        {
                            this.props.reviews.map((review) => (
                                <div key={review.id}>
                                    <div>
                                        {
                                           this.rating(review.starRating)
                                        }
                                        <h3>Review from {review.userId.firstName }{review.userId.lastName}</h3>
                                        <h4>Title: 
                                            <span>{review.title}</span>
                                        </h4>
                                        <p>{review.customerReview}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            );
        }
    }
};

const mapState = (state) => {
    return {
        reviews: state.product.reviews // accessing the product reducer
    }
};

export default connect(mapState, null)(ProductReviews);