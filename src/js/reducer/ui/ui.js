import { TabType } from "../../const.js";
import {extend} from "./../../utils/utils.js";

const ActionType = {
  CHANGE_MENU_STATUS: `CHANGE_MENU_STATUS`,
  SET_TAB_TYPE: `SET_TAB_TYPE`,
};

const initialState = {
  isMenuOpened: false,
  tabType: TabType.DEPOSITS,
};

const ActionCreator = {

  toggleMenu: (status) => ({
    type: ActionType.CHANGE_MENU_STATUS,
    payload: !status,
  }),
  setTabType: (type) => ({
    type: ActionType.SET_TAB_TYPE,
    payload: type,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_MENU_STATUS:
      return extend(state, {
        isMenuOpened: action.payload,
      });
    case ActionType.SET_TAB_TYPE:
      return extend(state, {
        tabType: action.payload,
      });
    
    default:
      return state;
  };
};

export { reducer, ActionType, ActionCreator };
