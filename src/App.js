import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomeView from "./views/HomeView";
import ProfileView from "./views/ProfileView";
import SignupView from "./views/SignupView";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route exact path="/signup" component={SignupView} />
        <Route exact path="/profile/:id" component={ProfileView} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
