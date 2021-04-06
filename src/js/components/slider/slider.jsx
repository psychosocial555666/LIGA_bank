import React from "react";
import {connect} from "react-redux";
import {getCurrentSlide} from "../../reducer/ui/selectors";
import {ActionCreator} from "../../reducer/ui/ui.js"
import PropTypes from 'prop-types';
import { MAX_SLIDES, TIME_TO_CHANGE } from "../../const";

class Slider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.slide = null;
  }

  componentDidMount() {
    const {currentSlide, changeCurrentSlide} = this.props;
    this.timer = setInterval(
      () => {changeCurrentSlide(currentSlide)}, TIME_TO_CHANGE
    );
  }

  componentDidUpdate() {
    clearInterval(this.timer);
    const {currentSlide, changeCurrentSlide} = this.props;
    this.timer = setInterval(
      () => {changeCurrentSlide(currentSlide)}, TIME_TO_CHANGE
    );
  }

  render() {

    const {currentSlide} = this.props;

    switch (currentSlide) {
      case 1:
        this.slide = <article className="slider__item slider__item--slide-one">
        <div className="container slider__wrapper">
          <div className="slider__content">
            <h1>Лига Банк</h1>
            <p>Кредиты на любой случай</p>
            <a href="#calculator" className="slider__button button">Рассчитать кредит</a>
          </div>
          <ul className="slider__position">
            <li className="slider__point slider__point--active">
              <span className="visually-hidden">Первый слайд активен</span>
            </li>
            <li className="slider__point">
              <span className="visually-hidden">Второй слайд неактивен</span>
            </li>
            <li className="slider__point">
              <span className="visually-hidden">Третий слайд неактивен</span>
            </li>
          </ul>
        </div>
      </article>
        break;
      case 2:
        this.slide = <article className="slider__item slider__item--slide-two">
        <div className="container slider__wrapper">
          <div className="slider__content">
            <h1>Лига Банк</h1>
            <p>Ваша уверенность <br className="mobile-only"/> в завтрашнем дне</p>
          </div>
          <ul className="slider__position">
            <li className="slider__point">
              <span className="visually-hidden">Первый слайд неактивен</span>
            </li>
            <li className="slider__point slider__point--active">
              <span className="visually-hidden">Второй слайд активен</span>
            </li>
            <li className="slider__point">
              <span className="visually-hidden">Третий слайд неактивен</span>
            </li>
          </ul>
        </div>
      </article>
        break;
      case 3:
        this.slide = <article className="slider__item slider__item--slide-three">
        <div className="container slider__wrapper">
          <div className="slider__content">
            <h1>Лига Банк</h1>
            <p>Всегда рядом</p>
            <a href="#offices" className="slider__button button">Найти отделение</a>
          </div>
          <ul className="slider__position">
            <li className="slider__point">
              <span className="visually-hidden">Первый слайд неактивен</span>
            </li>
            <li className="slider__point">
              <span className="visually-hidden">Второй слайд неактивен</span>
            </li>
            <li className="slider__point slider__point--active">
              <span className="visually-hidden">Третий слайд активен</span>
            </li>
          </ul>
        </div>
      </article>
        break;
    
      default:
        break;
    };

    return (
      <React.Fragment>
        <section className="slider">
          {this.slide}
        </section>
      </React.Fragment>
    );
  }
}

Slider.propTypes = {
  currentSlide: PropTypes.number,
};

const mapStateToProps = (state) => ({
  currentSlide: getCurrentSlide(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeCurrentSlide(slide) {
    dispatch(ActionCreator.changeCurrnetSlide(slide, MAX_SLIDES));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Slider);