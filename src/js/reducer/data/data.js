import {extend} from "./../../utils/utils.js";

const ActionType = {
  LOAD_car: `LOAD_car`,
  ADD_NEW_REVIEW: `ADD_NEW_REVIEW`,
};

const initialState = {
  car: [],
};

const ActionCreator = {
  loadcar: (car) => {
    return {
      type: ActionType.LOAD_car,
      payload: car,
    };
  },
  addNewReview: (review) => {
    return {
      type: ActionType.ADD_NEW_REVIEW,
      payload: review,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_car:
      return extend(state, {car: action.payload,}
      );

    case ActionType.ADD_NEW_REVIEW:
      return extend(state, {car: action.payload,}
      );
    default:
      return state;
  };
};

export {reducer, ActionType, ActionCreator};
