import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { GetLevelUpString, GetPokemonSafe, GetSafeName, PadNumber } from "../helpers"
import Data from '../DataContext'
import './Locations.css';


function Locations() {
  let match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:name`}>
          <LocationView />
        </Route>
        <Route path={`${match.path}`}>
          <div className="List-Container">
            {Data.Locations.map((loc) => {
              return (
                <Link className="List-Item"
                  to={`${match.url}/${GetSafeName(loc.Location)}`}>
                  {loc.Location}
                </Link>
              )
            })}
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default Locations;

function LocationView() {
  window.scrollTo(0, 0)
  let { name } = useParams<{ name: string }>();
  let Location = Data.Locations.find(m => GetSafeName(m.Location) === name);
  if (!Location) { Location = Data.Locations[0]; }
  const LocationName = `${Location.Location}`;
  return (
    <div className="Location-Container">
      <span className="Location-Name">{Location.Location}</span>
      <img src={`/maps/${GetSafeName(LocationName)}.png`} className="Location-Image"/>
      <span className="Location-Pokemon-List-Header">Pokemon found at this Location:</span>
      { Data.Pokemon.filter((p)=>{ 
        return p.FoundAt.filter((e) => { return e.Location.includes(LocationName)}).length > 0
      }).map((pokemon)=>{
        return (
          <Link className="List-Item"
            to={`../pokemon/${GetSafeName(pokemon.Name)}`}>
            <div className="Pokemon-Line-Item">
              <img src={`/sprites/${PadNumber(GetPokemonSafe(pokemon.Name).Number)}.png`} className="Pokemon-Sprite"/>
              <span className="Pokemon-Line-Item-Text">{pokemon.Name}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}