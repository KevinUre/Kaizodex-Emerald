import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { GetSafeName, PadNumber } from "../helpers"
import Data from '../DataContext'
import './Pokemon.css';


function Pokemon() {
  let match = useRouteMatch();
  console.log(JSON.stringify(match))
  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:name`}>
          <PokemonView />
        </Route>
        <Route path={`${match.path}`}>
          <div className="List-Container">
            {Data.Pokemon.map((pokemon) => {
              return (
                <Link className="List-Item"
                  to={`${match.url}/${GetSafeName(pokemon.Name)}`}>
                  {PadNumber(pokemon.Number)} {pokemon.Name}
                </Link>
              )
            })}
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default Pokemon;

function PokemonView() {
  let { name } = useParams<{ name: string }>();
  let Pokemon = Data.Pokemon.find(p => GetSafeName(p.Name) === name);
  if (!Pokemon) { Pokemon = Data.Pokemon[0]; }
  return (
    <div>
      <span>{Pokemon.Name}</span>
    </div>
  );
}