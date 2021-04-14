import React from "react";
import {connect} from "react-redux";
import InputMask from 'react-input-mask';
import {creditTypes, ModalType} from "../../const";
import {getCreditParametres, getCurrentCreditType, getRequestNumber} from "../../reducer/ui/selectors";
import {ActionCreator} from "../../reducer/ui/ui.js";
import {maskThisTime, maskThisValue, percentToSum} from "../../utils/utils";
import PropTypes from 'prop-types';
import { parametresType } from "../../types";

class StepThree extends React.PureComponent {

  constructor(props) {
    super(props);

    this.nameRef = React.createRef();
    this.telRef = React.createRef();
    this.emailRef = React.createRef();
    this.nameItemRef = React.createRef();
    this.telItemRef = React.createRef();
    this.emailItemRef = React.createRef();
    this.myStorage = window.localStorage;

    this.tel = null;

    this._checkFormValidity = this._checkFormValidity.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  componentDidMount() {
    let name = this.nameRef.current;
    let email = this.emailRef.current;

    name.focus();

    if(this.myStorage.name) {
      name.value = this.myStorage.name;
    };

    if(this.myStorage.email) {
      email.value = this.myStorage.email;
    };
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
    let name = this.nameRef.current.value;
    let tel = this.telRef.current.value;
    let email = this.emailRef.current.value;

    let nameItem = this.nameItemRef.current;
    let telItem = this.telItemRef.current;
    let emailItem = this.emailItemRef.current;

    let mask = /\S+@\S+\.\S+/;
    let isValid = true;
    this._validateItem(nameItem, true);
    this._validateItem(telItem, true);
    this._validateItem(emailItem, true);

    if(!name) {
      this._validateItem(nameItem, false);
      isValid = false;
    }

    if(!tel) {
      this._validateItem(telItem, false);
      isValid = false;
    }

    if(!mask.test(email)) {
      this._validateItem(emailItem, false);
      isValid = false;
    }
    return isValid;
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();

    const {
      increseRequestNumber,
      openPopup,
      closeRequest,
      requestNumber,
    } = this.props;

    let name = this.nameRef.current.value;
    let tel = this.telRef.current.value;
    let email = this.emailRef.current.value;

    let isFormValid = this._checkFormValidity();

    if(isFormValid) {
      increseRequestNumber(requestNumber);
      closeRequest(false);
      openPopup(ModalType.SUCCESS);

      this.myStorage.setItem('name', name);
      this.myStorage.setItem('tel', tel);
      this.myStorage.setItem('email', email);

    } else {
      evt.target.classList.add('step-three__form--invalid');
      setTimeout(() => {
        evt.target.classList.remove('step-three__form--invalid');
      }, 2000)
    }
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
          <form action="#" className="step-three__form" onSubmit={this._formSubmitHandler}>
            <div className="step-three__input step-three__input--name" ref={this.nameItemRef}>
              <input id="name" 
              type="text" 
              placeholder="ФИО"
              ref={this.nameRef}
              />
              <label htmlFor="name"><span className="visually-hidden">ФИО</span></label>
            </div>
            <div className="step-three__input step-three__input--tel" ref={this.telItemRef}>
              <InputMask mask="+7 (999)-999-99-99" id="tel" type="tel" placeholder="Телефон" ref={this.telRef} defaultValue={this.myStorage.tel ? this.myStorage.tel : ''}/>
              <label htmlFor="tel"><span className="visually-hidden">Телефон</span></label>
            </div>
            <div className="step-three__input step-three__input--email" ref={this.emailItemRef}>
              <input id="email" 
              type="email" 
              placeholder="E-mail"
              ref={this.emailRef}
              />
              <label htmlFor="email"><span className="visually-hidden">E-mail</span></label>
            </div>
            <button className="step-three__submit button">Отправить</button>
          </form>
        </div>
      </div>
    </React.Fragment>
    );
  }
}

StepThree.propTypes = {
  creditParametres: parametresType,
  currentCreditType: PropTypes.string,
  requestNumber: PropTypes.string,
  increaseRequestNumber: PropTypes.func,
  closeRequest: PropTypes.func,
  openPopup: PropTypes.func,
};

const mapStateToProps = (state) => ({
  currentCreditType: getCurrentCreditType(state),
  creditParametres: getCreditParametres(state),
  requestNumber: getRequestNumber(state),
});

const mapDispatchToProps = (dispatch) => ({
  increseRequestNumber(number) {
    dispatch(ActionCreator.increaseRequestNumber(number));
  },
  closeRequest(status) {
    dispatch(ActionCreator.changeRequestStatus(status));
  },
  openPopup(type) {
    dispatch(ActionCreator.changeModalType(type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StepThree);