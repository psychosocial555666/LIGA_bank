import React from "react";
import {connect} from "react-redux";
import plus from "../../../img/plus.svg";
import minus from "../../../img/minus.svg";

function StepTwo(props) {
    return (
    <React.Fragment>
      <div className="calculator__step step-two">
        <h3>Шаг 2. Введите параметры кредита</h3>
        <div className="step-two__item step-two__item--sum">
          <label htmlFor="price">Стоимость недвижимости</label>
          <div className="step-two__cover">
            <button type="button" className="step-two__price-control step-two__price-control--minus">
              <img src={minus} alt="minus"/>
            </button>
            <input type="text" id="price" defaultValue="2 000 000 рублей"/>
            <button type="button" className="step-two__price-control step-two__price-control--plus">
              <img src={plus} alt="plus"/>
            </button>
          </div>
          <span>От 1 200 000  до 25 000 000 рублей</span>
        </div>

        <div className="step-two__item step-two__item--initial">
          <label htmlFor="initial">Первоначальный взнос</label>
          <input type="text" id="initial" defaultValue="200 000 рублей"/>
          <div className="step-two__slider">
              <output htmlFor="slider">10%</output> 
              <input type="range" id="slider" min="10" max="100" step="5" defaultValue="10"/>
          </div>
        </div>

        <div className="step-two__item step-two__item--time">
          <label htmlFor="time">Срок кредитования</label>
          <input type="text" id="time" defaultValue="5 лет"/>
          <div className="step-two__slider">
              <output htmlFor="slider">5 лет</output> 
              <input type="range" id="slider" min="5" max="30" step="1" defaultValue="5"/>
          </div>
        </div>

        <div className="step-two__item step-two__item--capital">
          <input type="checkbox" id="capital"/>
          <label htmlFor="capital">Использовать материнский капитал</label>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(StepTwo);