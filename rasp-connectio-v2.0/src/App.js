import "./App.css";
import ContextClass from "./components/Config/Context.js";
import HomePi from './components/Pages/Rasp-piPages/HomePi.js';
const App = () => {
  return (
    <ContextClass>
      <HomePi/>
    </ContextClass>
  );
};

export default App;
