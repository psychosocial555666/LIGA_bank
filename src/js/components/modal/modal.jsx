import React from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/ui/ui.js";
import {ESC_KEY} from "../../const";
import PropTypes from 'prop-types';
import LoginForm from "../login-form/login-form.jsx";

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);

    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._overlayClickHandler = this._overlayClickHandler.bind(this);
    this._isEscKeyPressed = this._isEscKeyPressed.bind(this);
  }

  _closeButtonClickHandler () {
    this.props.popupClose(false);
  }

  _overlayClickHandler (evt) {
    if (evt.target.matches('.modal__overlay')) {
      this.props.popupClose(false);
    }
  }

  _isEscKeyPressed (evt) {
    if (evt.keyCode === ESC_KEY) {
      this.props.popupClose(false);
    }
  }

  componentDidMount () {
    window.addEventListener("keydown", this._isEscKeyPressed);
  }

  componentWillUnmount () {
    window.removeEventListener("keydown", this._isEscKeyPressed)
  };

  render() {
    return(
      <React.Fragment>
        <section className="modal">
          <div className="modal__overlay" onClick={this._overlayClickHandler}>
            <LoginForm closeButtonClickHandler={this._closeButtonClickHandler}/>
          </div>
        </section>
      </React.Fragment>
    )
  };
};

Modal.propTypes = {
  popupClose: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  popupClose(status) {
    dispatch(ActionCreator.changeModalStatus(status));
  },
});

export default connect(null, mapDispatchToProps)(Modal);