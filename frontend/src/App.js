import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpot from "./components/AllSpots";
import Spot from "./components/Spot"
import CreateSpotForm from "./components/CreateSpotForm";
import ManageAllSpotofUser from "./components/ManageAllSpotofUser";
import UpdateForm from "./components/UpdateUserSpot";
import SearchResults from "./components/SearchResults";
import ErrorScreen from "./components/ErrorScreen";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="WholeApp">
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
      <Switch>
        <Route exact path="/"><AllSpot /></Route>
        <Route exact path="/search/:search"><SearchResults /></Route>
        <Route exact path="/spots/new"><CreateSpotForm /></Route>
        <Route exact path="/spots/current"><ManageAllSpotofUser /></Route>
        <Route exact path="/spots/:spotId"><Spot /></Route>
        <Route exact path="/spots/:spotId/edit"><UpdateForm /></Route>
        <Route exact path="*"><ErrorScreen /></Route>
      </Switch>}

    </div>
  );
}

export default App;
