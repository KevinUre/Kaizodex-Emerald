import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Pokemon from './Pokemon/Pokemon';
import Abilities from './Abilities/Abilities';
import Moves from './Moves/Moves';

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
          <Link className="Navbar-Link" to="/types">Types</Link>
          <Link className="Navbar-Link" to="/abilities">Abilities</Link>
        </nav>
        <div className="Main">
            <Switch>
              <Route path="/pokemon">
                <Pokemon />
              </Route>
              <Route path="/locations">
                <p>Locations Under Construction</p>
              </Route>
              <Route path="/moves">
                <Moves />
              </Route>
              <Route path="/types">
                <p>Types Under Construction</p>
              </Route>
              <Route path="/abilities">
                <Abilities />
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