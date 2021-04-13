import React from "react";
import {connect} from "react-redux";
import { creditTypes } from "../../const";
import {getCurrentCreditType, getRequestStatus} from "../../reducer/ui/selectors";
import {ActionCreator} from "../../reducer/ui/ui.js";
import Offer from "../offer/offer";
import StepOne from "../step-one/step-one";
import StepThree from "../step-three/step-three";
import StepTwo from "../step-two/step-two";

function Calculator(props) {
  const {
    currentCreditType,
    isRequestOpened,
  } = props;

  return (
    <React.Fragment>
      <section className="calculator">
        <div className="container">
          <div className="calculator__content">
            <h2>Кредитный калькулятор</h2>
            <div className="calculator__wrapper">
              <div className="calculator__parametres">
                <StepOne />
                {currentCreditType === creditTypes.NONE ? '' : <StepTwo />}
              </div>
              {currentCreditType === creditTypes.NONE ? '' : <Offer />}
            </div>
          </div>
          {currentCreditType !== creditTypes.NONE && isRequestOpened ? <StepThree /> : ''}
        </div>
      </section>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  currentCreditType: getCurrentCreditType(state),
  isRequestOpened: getRequestStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onTabButtonClick(type) {
    dispatch(ActionCreator.setTabType(type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);