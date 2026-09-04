import { Home } from "./Home/Home";
import { Routes, Route } from "react-router-dom";
import { Tickets } from "./Home/Tickets";
import "./App.css";
import { Header } from "./Components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Tickets" element={<Tickets />} />
        <Route path="/Contact" element={<Home />}>
          Contact
        </Route>
      </Routes>
    </>
  );
}

export default App;
