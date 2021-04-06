import {extend, increaseSlide} from "./../../utils/utils.js";

const ActionType = {
  CHANGE_MENU_STATUS: `CHANGE_MENU_STATUS`,
  CHANGE_CURRENT_SLIDE: `CHANGE_CURRENT_SLIDE`,
};

const initialState = {
  isMenuOpened: false,
  currentSlide: 1,
};

const ActionCreator = {

  toggleMenu: (status) => ({
    type: ActionType.CHANGE_MENU_STATUS,
    payload: !status,
  }),
  changeCurrnetSlide: (slide, maxSlides) => ({
    type: ActionType.CHANGE_CURRENT_SLIDE,
    payload: increaseSlide(slide, maxSlides),
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_MENU_STATUS:
      return extend(state, {
        isMenuOpened: action.payload,
      });

    case ActionType.CHANGE_CURRENT_SLIDE:
      return extend(state, {
        currentSlide: action.payload,
      });
    
    default:
      return state;
  };
};

export { reducer, ActionType, ActionCreator };
