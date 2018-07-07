import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Help from "./pages/Help";
import Privacy from "./pages/Privacy";
import TermCond from "./pages/TermCond";
import Contact from "./pages/Contact";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Navibar from "./components/Navibar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";


const App = () => (
  <Router>
    <div>
      <Navibar />
      <Wrapper>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/terms" component={TermCond} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/login" component={Login} />
      </Wrapper>
      <Footer />
    </div>
  </Router>
);

export default App;


