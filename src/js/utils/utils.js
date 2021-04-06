const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const increaseSlide = (slide, maxSlides) => {
  let increasedSlide = slide + 1;
  let result = increasedSlide > maxSlides ? 1 : slide + 1;
  return result;
}

export {extend, increaseSlide};