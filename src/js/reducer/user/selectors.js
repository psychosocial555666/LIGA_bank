import NameSpace from "../name-space";

const NAME_SPACE = NameSpace.USER;

export const getCar = (state) => {
  return state[NAME_SPACE].auth;
};
