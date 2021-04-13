import React from "react";
import {connect} from "react-redux";
import InputMask from 'react-input-mask';
import { creditTypes } from "../../const";
import {getCreditParametres, getCurrentCreditType, getRequestNumber} from "../../reducer/ui/selectors";
import {ActionCreator} from "../../reducer/ui/ui.js";
import { maskThisTime, maskThisValue, percentToSum } from "../../utils/utils";

class StepThree extends React.PureComponent {

  constructor(props) {
    super(props);

    this.nameRef = React.createRef();
    this.telRef = React.createRef();
    this.emailRef = React.createRef();

  }

  _validateItem(item, isValid) {
    if(isValid) {
      item.classList.remove('step-three__input--invalid');
      return;
    }

    item.classList.add('step-three__input--invalid');
    return;
  }

  _checkFormValidity() {
    let name = this.nameRef.current;
    let tel = this.telRef.current;
    let email = this.emailRef.current;
    let mask = /\S+@\S+\.\S+/;
    let isValid = true;
    this._validateItem(name, true);
    this._validateItem(tel, true);
    this._validateItem(email, true);

    if(!name.value) {
      this._validateItem(name, false);
    }

    if(!name.value) {
      this._validateItem(name, false);
      isValid = false;
    }

    if(!tel.value) {
      this._validateItem(tel, false);
      isValid = false;
    }

    if(!mask.test(email.value)) {
      this._validateItem(email, false);
      isValid = false;
    }
    return isValid;
  }

  render() {

    const {creditParametres, currentCreditType, requestNumber} = this.props;
    const {
      price,
      initialPercent,
      time,
    } = creditParametres;

    return (
      <React.Fragment>
      <div className="calculator__step step-three">
        <div className="step-three__content">
          <h3>Шаг 3. Оформление заявки</h3>
          <ul className="step-three__list">
            <li className="step-three__item">
              <span>
                Номер заявки
              </span>
              <p>
                {`№ ${requestNumber}`}
              </p>
            </li>
            <li className="step-three__item">
              <span>
                Цель кредита
              </span>
              <p>
                {currentCreditType === creditTypes.MORTGAGE ? `Ипотека` : `Автокредит`}
              </p>
            </li>
            <li className="step-three__item">
              <span>
                Стоимость недвижимости
              </span>
              <p>
                {maskThisValue(price, ` рублей`)}
              </p>
            </li>
            <li className="step-three__item">
              <span>
                Первоначальный взнос
              </span>
              <p>
                {maskThisValue(String(percentToSum(price, initialPercent)), ` рублей`)}
              </p>
            </li>
            <li className="step-three__item">
              <span>
                Срок кредитования
              </span>
              <p>
                {maskThisTime(time)}
              </p>
            </li>
          </ul>
          <form action="#" className="step-three__form">
            <div className="step-three__input step-three__input--name">
              <input id="name" 
              type="text" 
              placeholder="ФИО"
              ref={this.nameRef}
              />
              <label htmlFor="name"><span className="visually-hidden">ФИО</span></label>
            </div>
            <div className="step-three__input step-three__input--tel">
              <InputMask mask="+7 (999)-999-99-99" id="name" type="tel" placeholder="Телефон" ref={this.telRef} />
              <label htmlFor="name"><span className="visually-hidden">Телефон</span></label>
            </div>
            <div className="step-three__input step-three__input--email">
              <input id="name" 
              type="email" 
              placeholder="E-mail"
              ref={this.emailRef}
              />
              <label htmlFor="name"><span className="visually-hidden">E-mail</span></label>
            </div>
            <button className="step-three__submit button">Отправить</button>
          </form>
        </div>
      </div>
    </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCreditType: getCurrentCreditType(state),
  creditParametres: getCreditParametres(state),
  requestNumber: getRequestNumber(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateCreditParametres(parametres) {
    dispatch(ActionCreator.updateCreditParametres(parametres));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StepThree);