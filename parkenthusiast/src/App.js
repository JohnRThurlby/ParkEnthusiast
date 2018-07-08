import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navibar from "./components/Navibar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import ModalConductor from "./components/ModalConductor";


const App = () => (
  <Router>
    <div>
      <Navibar />
      <Wrapper>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        </Wrapper>
      <Footer />
      <ModalConductor />
    </div>
  </Router>
);

export default App;


