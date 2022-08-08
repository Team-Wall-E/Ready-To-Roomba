import axios from "axios";

// ACTION TYPES
const CREATE_REVIEW = "CREATE_REVIEW";
const EDIT_REVIEW = "EDIT_REVIEW";
const DELETE_REVIEW = "DELETE_REVIEW";

// Action Creators
const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};

const editReview = (review) => {
  return {
    type: EDIT_REVIEW,
    review,
  };
};

const deleteReview = (review) => {
  return {
    type: DELETE_REVIEW,
    review,
  };
};

const TOKEN = "token";

export const addReviewThunk = (newReview) => {
  return async (dispatch) => {
      try {
        const token = {
          headers: {
            authorization: window.localStorage.getItem(TOKEN),
          },
        };
        const { data: review } = await axios.post(
          `/api/reviews`,
          newReview,
          token
        );
        dispatch(createReview(review));
      } catch (e) {
        console.error(e);
      }
  }
};

export const updateReviewThunk = (review) => {
  return async (dispatch) => {
    try {
      const { data: updatedReview } = await axios.put(
        `/api/reviews/${review.id}`,
        review
      );
      dispatch(editReview(updatedReview));
    } catch (e) {
      console.error(e);
    }
  }
};

export const deleteReviewThunk = (review) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/reviews/${review.id}`);
      dispatch(deleteReview(review));
    } catch (e) {
      console.error(e);
    }
  }
};

const initialState = {
  reviews: [],
  singleReview: {},
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REVIEW:
      return {
        reviews: [...state.reviews, action.review],
        singleReview: action.review,
      };
    case EDIT_REVIEW:
      const edit = state.reviews.filter(
        (review) => review.id !== action.review.id
      );
      return { ...state, reviews: [...edit, action.review] };
    case DELETE_REVIEW:
      const a = state.reviews.filter((b) => b.id !== action.review.id);
      return { ...state, reviews: a };
    default:
      return state;
  }
};

export default reviewsReducer;