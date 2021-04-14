import Header from "../header/header";
import Slider from "../slider/slider";
import Services from "../services/services.jsx";
import SimpleMap from "../map/map";
import Modal from "../modal/modal";
import {connect} from "react-redux";
import {getModalType} from "../../reducer/ui/selectors";
import Footer from "../footer/footer";
import Calculator from "../calculator/calculator";
import {ModalType} from "../../const";
import PropTypes from 'prop-types';

function App(props) {

  const {modalType} = props;

  return (
    <div className="app">
      {modalType !== ModalType.NONE ? <Modal /> : ''}
      <Header />
      <Slider />
      <Services />
      <Calculator />
      <div className="container">
        <SimpleMap />
      </div>
      <Footer />
    </div>
  );
};

App.propTypes = {
  modalType: PropTypes.string,
};

const mapStateToProps = (state) => ({
  modalType: getModalType(state),
});

export default connect(mapStateToProps, null)(App);
