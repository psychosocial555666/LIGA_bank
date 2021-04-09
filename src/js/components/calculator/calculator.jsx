import React from "react";
import {connect} from "react-redux";
import { creditTypes } from "../../const";
import {getCurrentCreditType} from "../../reducer/ui/selectors";
import {ActionCreator} from "../../reducer/ui/ui.js";
import StepOne from "../step-one/step-one";
import StepTwo from "../step-two/step-two";

function Calculator(props) {
  const {
    currentCreditType,
  } = props;

  return (
    <React.Fragment>
      <section className="calculator">
        <div className="container">
          <div className="calculator__content">
            <h2>Кредитный калькулятор</h2>
            <div className="calculator__wrapper">
              <StepOne />
              {currentCreditType === creditTypes.NONE ? '' : <StepTwo />}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  currentCreditType: getCurrentCreditType(state),
});

const mapDispatchToProps = (dispatch) => ({
  onTabButtonClick(type) {
    dispatch(ActionCreator.setTabType(type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);