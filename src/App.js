import "./App.css";
import CustomCard from "./components/card/card";
import Home from "./components/home/Home";

function App() {
  return (
    <>
      <div className="global-padding">
        <Home />
        <br></br>
        <CustomCard />
      </div>
    </>
  );
}

export default App;
