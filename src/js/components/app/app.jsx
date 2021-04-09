import Header from "../header/header";
import Slider from "../slider/slider";
import Services from "../services/services.jsx";
import SimpleMap from "../map/map";
import Modal from "../modal/modal";
import {connect} from "react-redux";
import {getModalStatus} from "../../reducer/ui/selectors";
import Footer from "../footer/footer";
import Calculator from "../calculator/calculator";

function App(props) {

  const {isModalOpened} = props;

  return (
    <div className={isModalOpened ? "app overlay" : "app"}>
      {isModalOpened ? <Modal /> : ''}
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

const mapStateToProps = (state) => ({
  isModalOpened: getModalStatus(state),
});

export default connect(mapStateToProps, null)(App);
