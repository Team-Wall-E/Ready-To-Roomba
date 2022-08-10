import React from 'react';
import { connect } from 'react-redux';
import { addReviewThunk } from '../store/reviews';
import Button from 'react-bootstrap/Button';

class CreateReview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO: reviews.owner does not exist
      //   owner: this.props.reviews.owner || '',
      title: '',
      customerReview: '',
      starRating: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.createReviewHandler = this.createReviewHandler.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  createReviewHandler(e) {
    e.preventDefault();
    const newReview = { ...this.state, productId: this.props.productId };

    this.props.createReview(newReview);
  }

  render() {
    console.log('🤢', this.props.productId);
    console.log('🍌', this.props);
    if (!this.props.user) {
      return null;
    } else {
      const ratings = [1, 2, 3, 4, 5];

      return (
        <div>
          <form
            onSubmit={this.createReviewHandler}
            className='needs-validation'
          >
            <h3>How satisfied were you with our product?😁</h3>
            <div>
              <div>
                <label htmlFor='title'>Title: </label>
                <input
                  type='text'
                  value={this.state.title}
                  name='title'
                  onChange={this.handleChange}
                  placeholder='title...'
                />
              </div>
              <div>
                <label htmlFor='customerReview'>Description: </label>
                <textarea
                  type='text'
                  value={this.state.customerReview}
                  name='customerReview'
                  onChange={this.handleChange}
                  placeholder='review...'
                />
              </div>
              <div>
                <label htmlFor='starRating'>Rating: </label>
                <select name='starRating' onChange={this.handleChange}>
                  {ratings.map((rating) => {
                    <option key={rating}>{starRating}</option>;
                  })}
                </select>
                <Button type='submit'>Submit Review</Button>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    productId: state.product.id,
    product: state.product, // accessing the product reducer
    reviews: state.product.reviews,
    reviewReducer: state.reviewReducer,
  };
};

const mapDispatch = (dispatch) => {
  createReview: (review) => dispatch(addReviewThunk(review));
};

export default connect(mapState, mapDispatch)(CreateReview);
