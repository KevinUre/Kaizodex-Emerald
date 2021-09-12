import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

// https://reactrouter.com/web/guides/quick-start

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="Nav-bar">
          <Link className="Navbar-Link Home-Button" to="/">Kaizodex Emerald</Link>
          <Link className="Navbar-Link" to="/pokemon">Pokemon</Link>
          <Link className="Navbar-Link" to="/locations">Locations</Link>
          <Link className="Navbar-Link" to="/moves">Moves</Link>
          <Link className="Navbar-Link" to="/abilities">Abilities</Link>
        </nav>
        <div className="Main">
          <Switch>
            <Route path="/pokemon">
              <p>Pokemon Under Construction</p>
            </Route>
            <Route path="/locations">
              <p>Locations Under Construction</p>
            </Route>
            <Route path="/moves">
              <p>Moves Under Construction</p>
            </Route>
            <Route path="/abilities">
              <p>Abilities Under Construction</p>
            </Route>
            <Route path="/">
              <p>Home Under Construction</p>
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

{/* <DataContext.Consumer>
  {context => (
    <span>{context.Name}</span>
  )}
</DataContext.Consumer> */}