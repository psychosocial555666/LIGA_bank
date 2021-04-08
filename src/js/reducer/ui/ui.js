import { TabType } from "../../const.js";
import { extend } from "./../../utils/utils.js";

const ActionType = {
  CHANGE_MENU_STATUS: `CHANGE_MENU_STATUS`,
  CHANGE_MODAL_STATUS: `CHANGE_MODAL_STATUS`,
  CHANGE_LOGIN_VALIDITY: `CHANGE_LOGIN_VALIDITY`,
  CHANGE_PASSWORD_VALIDITY: `CHANGE_PASSWORD_VALIDITY`,
  CHANGE_PASSWORD_SHOW_STATUS: `CHANGE_PASSWORD_SHOW_STATUS`,
  CHANGE_LOGIN_FORM_VALIDITY: `CHANGE_LOGIN_FORM_VALIDITY`,
  SET_TAB_TYPE: `SET_TAB_TYPE`,
};

const initialState = {
  isMenuOpened: false,
  isModalOpened: false,
  isLoginValid: true,
  isPasswordValid: true,
  isPasswordShown: false,
  isLoginFormValid: true,
  tabType: TabType.DEPOSITS,
};

const ActionCreator = {

  toggleMenu: (status) => ({
    type: ActionType.CHANGE_MENU_STATUS,
    payload: !status,
  }),
  changeModalStatus: (status) => ({
    type: ActionType.CHANGE_MODAL_STATUS,
    payload: status,
  }),
  setTabType: (type) => ({
    type: ActionType.SET_TAB_TYPE,
    payload: type,
  }),
  changeLoginValidity: (status) => ({
    type: ActionType.CHANGE_LOGIN_VALIDITY,
    payload: status,
  }),
  changePasswordValidity: (status) => ({
    type: ActionType.CHANGE_PASSWORD_VALIDITY,
    payload: status,
  }),
  changePasswordShowStatus: (status) => ({
    type: ActionType.CHANGE_PASSWORD_SHOW_STATUS,
    payload: status,
  }),
  changeLoginFormValidity: (status) => ({
    type: ActionType.CHANGE_LOGIN_FORM_VALIDITY,
    payload: status,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_MENU_STATUS:
      return extend(state, {
        isMenuOpened: action.payload,
      });
    case ActionType.CHANGE_MODAL_STATUS:
      return extend(state, {
        isModalOpened: action.payload,
      });
    case ActionType.SET_TAB_TYPE:
      return extend(state, {
        tabType: action.payload,
      });
    case ActionType.CHANGE_LOGIN_VALIDITY:
      return extend(state, {
        isLoginValid: action.payload,
      });
    case ActionType.CHANGE_PASSWORD_VALIDITY:
      return extend(state, {
        isPasswordValid: action.payload,
      });
    case ActionType.CHANGE_PASSWORD_SHOW_STATUS:
      return extend(state, {
        isPasswordShown: action.payload,
      });
    case ActionType.CHANGE_LOGIN_FORM_VALIDITY:
      return extend(state, {
        isLoginFormValid: action.payload,
      });

    default:
      return state;
  };
};

export { reducer, ActionType, ActionCreator };
