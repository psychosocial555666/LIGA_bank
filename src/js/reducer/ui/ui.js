import { creditTypes, TabType } from "../../const.js";
import { extend, initiateParametres } from "./../../utils/utils.js";

const ActionType = {
  CHANGE_MENU_STATUS: `CHANGE_MENU_STATUS`,
  CHANGE_MODAL_STATUS: `CHANGE_MODAL_STATUS`,
  CHANGE_CREDIT_SELECT_STATUS: `CHANGE_CREDIT_SELECT_STATUS`,
  CHANGE_LOGIN_VALIDITY: `CHANGE_LOGIN_VALIDITY`,
  CHANGE_PASSWORD_VALIDITY: `CHANGE_PASSWORD_VALIDITY`,
  CHANGE_PASSWORD_SHOW_STATUS: `CHANGE_PASSWORD_SHOW_STATUS`,
  CHANGE_LOGIN_FORM_VALIDITY: `CHANGE_LOGIN_FORM_VALIDITY`,
  SET_TAB_TYPE: `SET_TAB_TYPE`,
  SET_CREDIT_TYPE: `SET_CREDIT_TYPE`,
  UPDATE_CREDIT_PARAMETRES: `UPDATE_CREDIT_PARAMETRES`,
};

const initialState = {
  isMenuOpened: false,
  isModalOpened: false,
  isLoginValid: true,
  isPasswordValid: true,
  isPasswordShown: false,
  isLoginFormValid: true,
  isCreditTypeSelectOpened: false,
  tabType: TabType.DEPOSITS,
  currentCreditType: creditTypes.NONE,
  creditParametres: {},
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
  changeCreditSelectStatus: (status) => ({
    type: ActionType.CHANGE_CREDIT_SELECT_STATUS,
    payload: !status,
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
  setCreditType: (type) => ({
    type: ActionType.SET_CREDIT_TYPE,
    payload: type,
  }),
  updateCreditParametres: (parametres) => ({
    type: ActionType.UPDATE_CREDIT_PARAMETRES,
    payload: parametres,
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
    case ActionType.CHANGE_CREDIT_SELECT_STATUS:
      return extend(state, {
        isCreditTypeSelectOpened: action.payload,
      });
    case ActionType.SET_TAB_TYPE:
      return extend(state, {
        tabType: action.payload,
      });
    case ActionType.SET_CREDIT_TYPE:
      return extend(state, {
        currentCreditType: action.payload,
        creditParametres: initiateParametres(action.payload),
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
    case ActionType.UPDATE_CREDIT_PARAMETRES:
      return extend(state, {
        creditParametres: action.payload,
      });

    default:
      return state;
  };
};

export { reducer, ActionType, ActionCreator };
