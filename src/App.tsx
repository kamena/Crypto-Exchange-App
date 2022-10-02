import { Routes, Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom"
import Home from './components/Home';
import Header from "./common/Header/Header";

import './App.scss'

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/:symbol" element={<Home />} />
          <Route path="/:symbol/details" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
