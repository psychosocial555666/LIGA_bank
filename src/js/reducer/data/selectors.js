import NameSpace from "../name-space";

const NAME_SPACE = NameSpace.DATA;

export const getCar = (state) => {
  return state[NAME_SPACE].car;
};
