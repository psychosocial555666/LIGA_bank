import React from "react";
import {connect} from "react-redux";
import {getCreditParametres, getCurrentCreditType} from "../../reducer/ui/selectors";
import {ActionCreator} from "../../reducer/ui/ui.js";
import plus from "../../../img/plus.svg";
import minus from "../../../img/minus.svg";
import { creditTypes, MAX_PERCENT } from "../../const";
import { maskThisValue, extend, increasePrice, reducePrice, checkValueValidity, returnCorrectValue, percentToSum, sumToPercent } from "../../utils/utils";

class StepTwo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.priceRef = React.createRef();
    this.persentInputRef = React.createRef();
    this.timeInputRef = React.createRef();
    this.persentSliderRef = React.createRef();
    this.timeInputRef = React.createRef();
    this.timeSliderRef = React.createRef();
    this.capitalRef = React.createRef();
    this.cascoRef = React.createRef();
    this.insuranceRef = React.createRef();

    this.initialSum = null;

    this._initialSliderChangeHandler = this._initialSliderChangeHandler.bind(this);
    this._timeSliderChangeHandler = this._timeSliderChangeHandler.bind(this);
    this._capitalCheckboxChangeHandler = this._capitalCheckboxChangeHandler.bind(this);
    this._cascoCheckboxChangeHandler = this._cascoCheckboxChangeHandler.bind(this);
    this._insuranceCheckboxChangeHandler = this._insuranceCheckboxChangeHandler.bind(this);
  }

  componentDidMount() {
    this.priceRef.current.value = maskThisValue(this.props.creditParametres.price, ` рублей`);
    this._countInitialSum();
    this.persentInputRef.current.value = maskThisValue(String(this.initialSum), ` рублей`);
    this.persentSliderRef.current.value = this.props.creditParametres.initialPercent;
    this.timeInputRef.current.value = maskThisValue(String(this.props.creditParametres.time), ` лет`);
    this.timeSliderRef.current.value = this.props.creditParametres.time;
  }

  componentDidUpdate() {
    this.priceRef.current.value = maskThisValue(this.props.creditParametres.price, ` рублей`);
    this.priceRef.current.parentNode.parentNode.classList.remove('step-two__item--invalid');
    this.persentInputRef.current.parentNode.classList.remove('step-two__item--invalid');
    this.timeInputRef.current.parentNode.classList.remove('step-two__item--invalid');
    this._countInitialSum();
    this.persentInputRef.current.value = maskThisValue(String(Math.round(this.initialSum)), ` рублей`);
    this.persentSliderRef.current.value = this.props.creditParametres.initialPercent;
    this.timeInputRef.current.value = maskThisValue(String(this.props.creditParametres.time), ` лет`);
    this.timeSliderRef.current.value = this.props.creditParametres.time;
  }

  _priceButtonIncreaseHandler(value, step, maxValue) {
    const {creditParametres, updateCreditParametres}= this.props;
    let result = increasePrice(value, step, maxValue);

    let newParametres = extend(creditParametres, {price: result});
    updateCreditParametres(newParametres);
  }

  _priceButtonReduceHandler(value, step, minValue) {
    const {creditParametres, updateCreditParametres}= this.props;
    
    let result = reducePrice(value, step, minValue);

    let newParametres = extend(creditParametres, {price: result});
    updateCreditParametres(newParametres);
  }

  _itemInputChangeHandler(value, minValue, maxValue, item) {
    if(!/^[0-9]+$/.test(value)) {
      this.priceRef.current.value = "";
    }
    checkValueValidity(value, minValue, maxValue) ? 
      item.classList.add('step-two__item--invalid') : 
      item.classList.remove('step-two__item--invalid');
  }

  _priceInputBlurHandler(evt, minValue, maxValue) {
    const {creditParametres, updateCreditParametres}= this.props;
    let value = evt.target.value;

    let result = returnCorrectValue(value, minValue, maxValue);
    let newParametres = extend(creditParametres, {price: result});
    updateCreditParametres(newParametres);
  }

  _initialInputBlurHandler(evt, minValue, maxValue, price) {
    const {creditParametres, updateCreditParametres}= this.props;
    let value = evt.target.value;

    let result = returnCorrectValue(value, minValue, maxValue);
    let newParametres = extend(creditParametres, {
      initialPercent: sumToPercent(price, result)
    });
    updateCreditParametres(newParametres);
  }

  _timeInputBlurHandler(evt, minValue, maxValue) {
    const {creditParametres, updateCreditParametres}= this.props;
    let value = evt.target.value;

    let result = returnCorrectValue(value, minValue, maxValue);
    let newParametres = extend(creditParametres, {
      time: result,
    });
    updateCreditParametres(newParametres);
  }

  _initialSliderChangeHandler(evt) {
    const {creditParametres, updateCreditParametres}= this.props;

    let newParametres = extend(creditParametres, {
      initialPercent: Number(evt.target.value)
    });
    updateCreditParametres(newParametres);
  }

  _timeSliderChangeHandler(evt) {
    const {creditParametres, updateCreditParametres}= this.props;

    let newParametres = extend(creditParametres, {
      time: Number(evt.target.value)
    });
    updateCreditParametres(newParametres);
  }

  _capitalCheckboxChangeHandler(evt) {
    const {creditParametres, updateCreditParametres}= this.props;

    let newParametres = extend(creditParametres, {
      capital: evt.target.checked,
    });
    updateCreditParametres(newParametres);
  }

  _cascoCheckboxChangeHandler(evt) {
    const {creditParametres, updateCreditParametres}= this.props;

    let newParametres = extend(creditParametres, {
      casco: evt.target.checked,
    });
    updateCreditParametres(newParametres);
  }

  _insuranceCheckboxChangeHandler(evt) {
    const {creditParametres, updateCreditParametres}= this.props;

    let newParametres = extend(creditParametres, {
      insurance: evt.target.checked,
    });
    updateCreditParametres(newParametres);
  }

  _countInitialSum() {
    this.initialSum = percentToSum(this.props.creditParametres.price, this.props.creditParametres.initialPercent);
  }

  render() {
    const {creditParametres, currentCreditType} = this.props;
    const {
      price,
      priceStep,
      minPrice,
      maxPrice,
      initialPercent,
      minInitialPercent,
      time,
      minTime,
      maxTime,
    } = creditParametres;

    return (
      <React.Fragment>
        <div className="calculator__step step-two">
          <h3>Шаг 2. Введите параметры кредита</h3>
          <div className="step-two__item step-two__item--sum">
            <label htmlFor="price">{currentCreditType === creditTypes.MORTGAGE ? "Стоимость недвижимости" : "Стоимость автомобиля"}</label>
            <div className="step-two__cover">
              <button type="button" 
              className="step-two__price-control step-two__price-control--minus"
              onClick={() => {this._priceButtonReduceHandler(price, priceStep, minPrice)}}
              >
                <img src={minus} alt="minus"/>
              </button>
              <input type="text" id="price" 
              ref={this.priceRef}
              onFocus={(evt) => {evt.target.value = price}}
              onChange={(evt) => {this._itemInputChangeHandler(evt.target.value, minPrice, maxPrice, evt.target.parentNode.parentNode)}}
              onBlur={(evt) => {this._priceInputBlurHandler(evt, minPrice, maxPrice)}} 
              />
              <button type="button" 
              className="step-two__price-control step-two__price-control--plus"
              onClick={() => {this._priceButtonIncreaseHandler(price, priceStep, maxPrice)}}
              >
                <img src={plus} alt="plus"/>
              </button>
            </div>
            <span>{`От ${maskThisValue(minPrice, ``)}  до ${maskThisValue(maxPrice, ``)} рублей`}</span>
          </div>
  
          <div className="step-two__item step-two__item--initial">
            <label htmlFor="initial">Первоначальный взнос</label>
            <input type="text" id="initial" 
            ref={this.persentInputRef}
            onFocus={(evt) => {evt.target.value = this.initialSum}}
            onChange={(evt) => {this._itemInputChangeHandler(evt.target.value, percentToSum(price, minInitialPercent), percentToSum(price, MAX_PERCENT), evt.target.parentNode)}}
            onBlur={(evt) => {this._initialInputBlurHandler(evt, percentToSum(price, minInitialPercent), percentToSum(price, MAX_PERCENT), price)}}
            />
            <div className="step-two__slider">
                <output htmlFor="slider">{`${initialPercent} %`}</output> 
                <input type="range" id="slider" 
                ref={this.persentSliderRef}
                min={minInitialPercent} 
                max={String(MAX_PERCENT)} 
                step="5"
                onChange={this._initialSliderChangeHandler}
                />
            </div>
          </div>
  
          <div className="step-two__item step-two__item--time">
            <label htmlFor="time">Срок кредитования</label>
            <input type="text" id="time"
            ref={this.timeInputRef}
            onFocus={(evt) => {evt.target.value = time}}
            onChange={(evt) => {this._itemInputChangeHandler(evt.target.value, minTime, maxTime, evt.target.parentNode)}}
            onBlur={(evt) => {this._timeInputBlurHandler(evt, minTime, maxTime)}}
            />
            <div className="step-two__slider">
                <output htmlFor="slider">{`${time} лет`}</output> 
                <input type="range" id="slider" 
                ref={this.timeSliderRef}
                min={minTime} 
                max={maxTime} 
                step="1"
                onChange={this._timeSliderChangeHandler}
                />
            </div>
          </div>

          {currentCreditType === creditTypes.MORTGAGE ? 
          (
          <div className="step-two__item step-two__item--additional">
            <input type="checkbox" id="capital" className="visually-hidden"
            checked = {this.props.capital}
            onChange={this._capitalCheckboxChangeHandler}
            />
            <label htmlFor="capital">Использовать материнский капитал</label>
          </div>
          ) : (
            <React.Fragment>
            <div className="step-two__item step-two__item--additional">
              <input type="checkbox" id="CASCO" className="visually-hidden"
              checked = {this.props.casco}
              onChange={this._cascoCheckboxChangeHandler}
              />
              <label htmlFor="CASCO">Оформить КАСКО в нашем банке</label>
            </div>
            <div className="step-two__item step-two__item--additional">
              <input type="checkbox" id="insurance" className="visually-hidden"
              checked = {this.props.insurance}
              onChange = {this._insuranceCheckboxChangeHandler}
              />
              <label htmlFor="insurance">Оформить Страхование жизни в нашем банке</label>
            </div>
            </React.Fragment>
          )
        }
          
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCreditType: getCurrentCreditType(state),
  creditParametres: getCreditParametres(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateCreditParametres(parametres) {
    dispatch(ActionCreator.updateCreditParametres(parametres));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StepTwo);