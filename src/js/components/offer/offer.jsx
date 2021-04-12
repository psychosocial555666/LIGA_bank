import React from "react";
import {connect} from "react-redux";
import { creditTypes } from "../../const";
import {getCreditParametres, getCurrentCreditType} from "../../reducer/ui/selectors";
import { maskThisValue } from "../../utils/utils";

function Offer(props) {
  const {currentCreditType, creditParametres} = props;
  const {creditSum, creditPercent, payment, income, isOfferCorrect, minCreditSum} = creditParametres;
  return (
    <React.Fragment>
      {isOfferCorrect ? 
        <section className="calculator__offer offer">
          <div className="offer__content">
            <h3>Наше предложение</h3>
            <ul className="offer__list">
              <li className="offer__item">
                <p>{maskThisValue(creditSum, ` рублей`)}</p>
                <span>{currentCreditType === creditTypes.MORTGAGE ? `Сумма ипотеки` : `Сумма автокредита`}</span>
              </li>
              <li className="offer__item">
                <p>{`${creditPercent} %`}</p>
                <span>Процентная ставка</span>
              </li>
              <li className="offer__item">
                <p>{maskThisValue(payment, ` рублей`)}</p>
                <span>Ежемесячный платеж</span>
              </li>
              <li className="offer__item">
                <p>{maskThisValue(income, ` рублей`)}</p>
                <span>Необходимый доход</span>
              </li>
            </ul>
            <button type="button" className="offer__button button">Оформить заявку</button>
          </div>
        </section> : 
        <section className="calculator__offer offer">
        <div className="offer__content offer__content--invalid">
          <h3>Наш банк не выдаёт ипотечные кредиты меньше {maskThisValue(minCreditSum, ` рублей`)}.</h3>
          <p>Попробуйте использовать другие параметры для расчёта.</p>
        </div>
        </section>
      }
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  currentCreditType: getCurrentCreditType(state),
  creditParametres: getCreditParametres(state),
});



export default connect(mapStateToProps, null)(Offer);