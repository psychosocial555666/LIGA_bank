import Header from "../header/header";
import Slider from "../slider/slider";
import Services from "../services/services.jsx";
import SimpleMap from "../map/map";

function App(props) {

  return (
    <div className="app">
      <Header />
      <Slider />
      <Services />
      <div className="container">
        <SimpleMap />
      </div>
    </div>
  );
};

export default App;
