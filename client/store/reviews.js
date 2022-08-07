import axios from "axios";

// ACTION TYPES
const LOAD_REVIEWS = "LOAD_REVIEWS";
const CREATE_REVIEW = "CREATE_REVIEW";
const EDIT_REVIEW = "EDIT_REVIEW";
const DELETE_REVIEW = "DELETE_REVIEW";

// Action Creators
const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
};

const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
};

const editReview = (review) => {
    return {
        type: EDIT_REVIEW,
        review
    }
};

const deleteReview = (review) => {
    return {
        type: DELETE_REVIEW,
        review
    }
};

// Thunk Creators
const fetchReviewsThunk = (productId) => {
    try {
        return async (dispatch) => {
            const { data } = await axios.get(`/api/products/${productId}/reviews`);
            dispatch(loadReviews(data));
        }
    } catch (e) {
        console.error(e);
    }
};

