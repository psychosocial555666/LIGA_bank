import {TabType} from "../../const.js";
import {extend} from "./../../utils/utils.js";

const ActionType = {
  INCREASE_SLIDE: `INCREASE_SLIDE`,
  REDUCE_SLIDE: `REDUCE_SLIDE`,
  SET_CURRENT_TAB: `SET_CURRENT_TAB`,
  CHANGE_MODAL_STATUS: `CHANGE_MODAL_STATUS`,
  CHANGE_NAME_VALIDITY: `CHANGE_NAME_VALIDITY`,
  CHANGE_COMMENT_VALIDITY: `CHANGE_COMMENT_VALIDITY`,
};

const initialState = {
  currentSlide: 0,
  currentTab: TabType.CHARACTERISTICS,
  isModalOpened: false,
  isNameValid: true,
  isCommentValid: true,
};

const ActionCreator = {
  increaseSlide: (slide) => ({
    type: ActionType.INCREASE_SLIDE,
    payload: slide += 1,
  }),
  reduceSlide: (slide) => ({
    type: ActionType.REDUCE_SLIDE,
    payload: slide -= 1,
  }),
  setCurrentTab: (tab) => ({
    type: ActionType.SET_CURRENT_TAB,
    payload: tab,
  }),
  changeModalStatus: (status) => ({
    type: ActionType.CHANGE_MODAL_STATUS,
    payload: status,
  }),
  changeNameValidity: (status) => ({
    type: ActionType.CHANGE_NAME_VALIDITY,
    payload: status,
  }),
  changeCommentValidity: (status) => ({
    type: ActionType.CHANGE_COMMENT_VALIDITY,
    payload: status,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREASE_SLIDE:
      return extend(state, {
        currentSlide: action.payload,
      });

    case ActionType.REDUCE_SLIDE:
      return extend(state, {
        currentSlide: action.payload,
      });

    case ActionType.SET_CURRENT_TAB:
      return extend(state, {
        currentTab: action.payload,
      });

    case ActionType.CHANGE_MODAL_STATUS:
      return extend(state, {
        isModalOpened: action.payload,
      });

    case ActionType.CHANGE_NAME_VALIDITY:
      return extend(state, {
        isNameValid: action.payload,
      });

    case ActionType.CHANGE_COMMENT_VALIDITY:
      return extend(state, {
        isCommentValid: action.payload,
      });
    default:
      return state;
  };
};

export { reducer, ActionType, ActionCreator };
