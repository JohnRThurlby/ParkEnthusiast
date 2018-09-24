import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Home          from "./pages/Home"
import Login         from "./pages/Login"
import Registration  from "./pages/Registration"
import Contact       from "./pages/Contact"
import ParkAdmin     from "./pages/Parkadmin"
import ParkSelection from "./pages/Parkselection"
import RideSelection from "./pages/Rideselection"
import RideInfo      from "./pages/Rideinfo"
import RideAdmin     from "./pages/Rideadmin"
import RideNow       from "./pages/Ridenow"
import NoMatch       from "./pages/NoMatch"
import Navibar       from "./components/Navibar"
import Footer        from "./components/Footer"
import Forgotpassword from "./pages/Forgotpassword"


const App = () => (
  <Router>
    <div>
      <Navibar />
      <Switch>
        <Route exact path="/"              component={Home} />
        <Route exact path="/home"          component={Home} />
        <Route exact path="/login"         component={Login} />
        <Route exact path="/contact"       component={Contact} />
        <Route exact path="/registration"  component={Registration} />
        <Route exact path="/parkselection" component={ParkSelection} />
        <Route exact path="/rideselection" component={RideSelection} />
        <Route exact path="/rideinfo"      component={RideInfo} />
        <Route exact path="/rideadmin"     component={RideAdmin} />
        <Route exact path="/parkadmin"     component={ParkAdmin} />
        <Route exact path="/ridenow"       component={RideNow} />
        <Route exact path="/forgotpassword" component={Forgotpassword} />
        <Route component={NoMatch} />
      </Switch>
      <Footer />
    </div>
  </Router>
)

export default App