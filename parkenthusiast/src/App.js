import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import Home          from "./pages/Home"
import ParkSelection from "./pages/Parkselection"
import RideSelection from "./pages/Rideselection"
import RideInfo      from "./pages/Rideinfo"
import RideNow       from "./pages/Ridenow"
import Navibar       from "./components/Navibar"
import Footer        from "./components/Footer"
import Wrapper       from "./components/Wrapper"

const App = () => (
  <Router>
    <div>
      <Navibar />
      <Wrapper>
        <Route exact path="/"              component={Home} />
        <Route exact path="/home"          component={Home} />
        <Route exact path="/parkselection" component={ParkSelection} />
        <Route exact path="/rideselection" component={RideSelection} />
        <Route exact path="/rideinfo"      component={RideInfo} />
        <Route exact path="/ridenow"       component={RideNow} />
      </Wrapper>
      <Footer />
    </div>
  </Router>
)

export default App


