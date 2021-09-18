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
import Locations from './Locations/Locations';
import Types from './Types/Types';
import Natures from './Natures/Natures';

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
          <Link className="Navbar-Link" to="/natures">Natures</Link>
        </nav>
          <Switch>
            <Route path="/pokemon">
              <div className="Main">
                <Pokemon />
              </div>
            </Route>
            <Route path="/locations">
              <div className="Main">
                <Locations/>
              </div>
            </Route>
            <Route path="/moves">
              <div className="Main">
                <Moves />
              </div>
            </Route>
            <Route path="/types">
              <div className="Main">
                <Types />
              </div>
            </Route>
            <Route path="/abilities">
              <div className="Main">
                <Abilities />
              </div>
            </Route>
            <Route path="/natures">
              <div className="Main">
                <Natures />
              </div>
            </Route>
            <Route path="/">
              <div className= "splash-container">
                <img className="splash" src={"/splash.png"}/>
              </div>
            </Route>
          </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;