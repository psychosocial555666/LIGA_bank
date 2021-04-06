import NameSpace from "../name-space";


const NAME_SPACE = NameSpace.UI;

export const getMenuStatus = (state) => {
  return state[NAME_SPACE].isMenuOpened;
};

export const getCurrentSlide = (state) => {
  return state[NAME_SPACE].currentSlide;
};
