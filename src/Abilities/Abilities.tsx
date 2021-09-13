import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { GetLevelUpString, GetPokemonSafe, GetSafeName, PadNumber } from "../helpers"
import Data from '../DataContext'
import './Abilities.css';

function Abilities() {
  let match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:name`}>
          <AbilityView />
        </Route>
        <Route path={`${match.path}`}>
          <div className="List-Container">
            {Data.Abilities.sort((a,b)=>{
              if (a.Name<b.Name) {return -1;}
              else if (b.Name>a.Name) { return 1;}
              return 0;
            }).map((ability) => {
              return (
                <Link className="List-Item"
                  to={`${match.url}/${GetSafeName(ability.Name)}`}>
                  {ability.Name}
                </Link>
              )
            })}
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default Abilities;

function AbilityView() {
  window.scrollTo(0, 0)
  let { name } = useParams<{ name: string }>();
  let Ability = Data.Abilities.find(a => GetSafeName(a.Name) === name);
  if (!Ability) { Ability = Data.Abilities[0]; }
  const AbilityName = `${Ability.Name}`;
  return (
    <div className="Ability-Container">
      <span className="Ability-Name">{Ability.Name}</span>
      <span className="Ability-Description">{Ability.Description}</span>
      <span className="Ability-Pokemon-List-Header">Pokemon with this Ability:</span>
      { Data.Pokemon.filter((p)=>{ return p.Abilities.includes(AbilityName)}).map((pokemon)=>{
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