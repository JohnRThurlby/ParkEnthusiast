import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Home          from "./pages/Home"
import ParkAdmin     from "./pages/Parkadmin"
import ParkSelection from "./pages/Parkselection"
import RideInfo      from "./pages/Rideinfo"
import RideAdmin     from "./pages/Rideadmin"
import RideNow       from "./pages/Ridenow"
import NoMatch       from "./pages/NoMatch"
import Navibar       from "./components/Navibar"
import Footer        from "./components/Footer"

const App = () => (
  <Router>
    <div>
      <Navibar />
      <Switch>
        <Route exact path="/"              component={Home} />
        <Route exact path="/home"          component={Home} />
        <Route exact path="/parkselection" component={ParkSelection} />
        <Route exact path="/rideinfo"      component={RideInfo} />
        <Route exact path="/rideadmin"     component={RideAdmin} />
        <Route exact path="/parkadmin"     component={ParkAdmin} />
        <Route exact path="/ridenow"       component={RideNow} />
        <Route component={NoMatch} />
      </Switch>
      <Footer />
    </div>
  </Router>
)

export default App


