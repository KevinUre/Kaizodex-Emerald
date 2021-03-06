import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { GetLevelUpString, GetPokemonSafe, GetSafeName, PadNumber } from "../helpers"
import Data from '../DataContext'
import './Types.css';


function Types() {
  let match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:name`}>
          <TypeView />
        </Route>
        <Route path={`${match.path}`}>
          <table className="type-table Type-Table">
            <thead>
              <tr>
                <th className="cell-atkdef">DEFENSE&nbsp;→<br />ATTACK&nbsp;↴</th>
                <th><Link className="type-icon type-normal type-cell type-abbr" to={`${match.url}/${GetSafeName("normal")}`} title="Normal">Nor</Link></th>
                <th><Link className="type-icon type-fire type-cell type-abbr" to={`${match.url}/${GetSafeName("fire")}`} title="Fire">Fir</Link></th>
                <th><Link className="type-icon type-water type-cell type-abbr" to={`${match.url}/${GetSafeName("water")}`} title="Water">Wat</Link></th>
                <th><Link className="type-icon type-electric type-cell type-abbr" to={`${match.url}/${GetSafeName("electric")}`} title="Electric">Ele</Link></th>
                <th><Link className="type-icon type-grass type-cell type-abbr" to={`${match.url}/${GetSafeName("grass")}`} title="Grass">Gra</Link></th>
                <th><Link className="type-icon type-ice type-cell type-abbr" to={`${match.url}/${GetSafeName("ice")}`} title="Ice">Ice</Link></th>
                <th><Link className="type-icon type-fighting type-cell type-abbr" to={`${match.url}/${GetSafeName("fighting")}`} title="Fighting">Fig</Link></th>
                <th><Link className="type-icon type-poison type-cell type-abbr" to={`${match.url}/${GetSafeName("poison")}`} title="Poison">Poi</Link></th>
                <th><Link className="type-icon type-ground type-cell type-abbr" to={`${match.url}/${GetSafeName("ground")}`} title="Ground">Gro</Link></th>
                <th><Link className="type-icon type-flying type-cell type-abbr" to={`${match.url}/${GetSafeName("flying")}`} title="Flying">Fly</Link></th>
                <th><Link className="type-icon type-psychic type-cell type-abbr" to={`${match.url}/${GetSafeName("psychic")}`} title="Psychic">Psy</Link></th>
                <th><Link className="type-icon type-bug type-cell type-abbr" to={`${match.url}/${GetSafeName("bug")}`} title="Bug">Bug</Link></th>
                <th><Link className="type-icon type-rock type-cell type-abbr" to={`${match.url}/${GetSafeName("rock")}`} title="Rock">Roc</Link></th>
                <th><Link className="type-icon type-ghost type-cell type-abbr" to={`${match.url}/${GetSafeName("ghost")}`} title="Ghost">Gho</Link></th>
                <th><Link className="type-icon type-dragon type-cell type-abbr" to={`${match.url}/${GetSafeName("dragon")}`} title="Dragon">Dra</Link></th>
                <th><Link className="type-icon type-dark type-cell type-abbr" to={`${match.url}/${GetSafeName("dark")}`} title="Dark">Dar</Link></th>
                <th><Link className="type-icon type-steel type-cell type-abbr" to={`${match.url}/${GetSafeName("steel")}`} title="Steel">Ste</Link></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th><Link className="type-icon type-normal type-cell" to={`${match.url}/${GetSafeName("normal")}`}>Normal</Link></th>
                <td title="Normal → Normal = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Normal → Fire = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Normal → Water = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Normal → Electric = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Normal → Grass = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Normal → Ice = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Normal → Fighting = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Normal → Poison = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Normal → Ground = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Normal → Flying = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Normal → Psychic = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Normal → Bug = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Normal → Rock = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Normal → Ghost = no effect" className="type-fx-cell type-fx-0">0</td> <td title="Normal → Dragon = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Normal → Dark = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Normal → Steel = not very effective" className="type-fx-cell type-fx-50">½</td> </tr>
              <tr>
                <th><Link className="type-icon type-fire type-cell" to={`${match.url}/${GetSafeName("fire")}`}>Fire</Link></th>
                <td title="Fire → Normal = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Fire → Fire = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Fire → Water = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Fire → Electric = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Fire → Grass = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Fire → Ice = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Fire → Fighting = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Fire → Poison = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Fire → Ground = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Fire → Flying = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Fire → Psychic = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Fire → Bug = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Fire → Rock = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Fire → Ghost = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Fire → Dragon = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Fire → Dark = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Fire → Steel = super-effective" className="type-fx-cell type-fx-200">2</td> </tr>
              <tr>
                <th><Link className="type-icon type-water type-cell" to={`${match.url}/${GetSafeName("water")}`}>Water</Link></th>
                <td title="Water → Normal = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Water → Fire = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Water → Water = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Water → Electric = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Water → Grass = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Water → Ice = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Water → Fighting = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Water → Poison = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Water → Ground = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Water → Flying = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Water → Psychic = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Water → Bug = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Water → Rock = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Water → Ghost = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Water → Dragon = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Water → Dark = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Water → Steel = normal effectiveness" className="type-fx-cell type-fx-100"></td> </tr>
              <tr>
                <th><Link className="type-icon type-electric type-cell" to={`${match.url}/${GetSafeName("electric")}`}>Electric</Link></th>
                <td title="Electric → Normal = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Electric → Fire = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Electric → Water = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Electric → Electric = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Electric → Grass = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Electric → Ice = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Electric → Fighting = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Electric → Poison = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Electric → Ground = no effect" className="type-fx-cell type-fx-0">0</td> <td title="Electric → Flying = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Electric → Psychic = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Electric → Bug = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Electric → Rock = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Electric → Ghost = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Electric → Dragon = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Electric → Dark = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Electric → Steel = normal effectiveness" className="type-fx-cell type-fx-100"></td> </tr>
              <tr>
                <th><Link className="type-icon type-grass type-cell" to={`${match.url}/${GetSafeName("grass")}`}>Grass</Link></th>
                <td title="Grass → Normal = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Grass → Fire = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Grass → Water = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Grass → Electric = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Grass → Grass = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Grass → Ice = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Grass → Fighting = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Grass → Poison = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Grass → Ground = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Grass → Flying = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Grass → Psychic = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Grass → Bug = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Grass → Rock = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Grass → Ghost = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Grass → Dragon = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Grass → Dark = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Grass → Steel = not very effective" className="type-fx-cell type-fx-50">½</td> </tr>
              <tr>
                <th><Link className="type-icon type-ice type-cell" to={`${match.url}/${GetSafeName("ice")}`}>Ice</Link></th>
                <td title="Ice → Normal = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ice → Fire = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Ice → Water = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Ice → Electric = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ice → Grass = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Ice → Ice = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Ice → Fighting = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ice → Poison = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ice → Ground = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Ice → Flying = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Ice → Psychic = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ice → Bug = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ice → Rock = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ice → Ghost = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ice → Dragon = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Ice → Dark = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ice → Steel = not very effective" className="type-fx-cell type-fx-50">½</td> </tr>
              <tr>
                <th><Link className="type-icon type-fighting type-cell" to={`${match.url}/${GetSafeName("fighting")}`}>Fighting</Link></th>
                <td title="Fighting → Normal = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Fighting → Fire = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Fighting → Water = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Fighting → Electric = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Fighting → Grass = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Fighting → Ice = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Fighting → Fighting = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Fighting → Poison = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Fighting → Ground = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Fighting → Flying = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Fighting → Psychic = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Fighting → Bug = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Fighting → Rock = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Fighting → Ghost = no effect" className="type-fx-cell type-fx-0">0</td> <td title="Fighting → Dragon = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Fighting → Dark = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Fighting → Steel = super-effective" className="type-fx-cell type-fx-200">2</td> </tr>
              <tr>
                <th><Link className="type-icon type-poison type-cell" to={`${match.url}/${GetSafeName("poison")}`}>Poison</Link></th>
                <td title="Poison → Normal = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Poison → Fire = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Poison → Water = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Poison → Electric = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Poison → Grass = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Poison → Ice = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Poison → Fighting = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Poison → Poison = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Poison → Ground = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Poison → Flying = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Poison → Psychic = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Poison → Bug = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Poison → Rock = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Poison → Ghost = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Poison → Dragon = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Poison → Dark = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Poison → Steel = no effect" className="type-fx-cell type-fx-0">0</td> </tr>
              <tr>
                <th><Link className="type-icon type-ground type-cell" to={`${match.url}/${GetSafeName("ground")}`}>Ground</Link></th>
                <td title="Ground → Normal = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ground → Fire = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Ground → Water = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ground → Electric = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Ground → Grass = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Ground → Ice = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ground → Fighting = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ground → Poison = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Ground → Ground = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ground → Flying = no effect" className="type-fx-cell type-fx-0">0</td> <td title="Ground → Psychic = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ground → Bug = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Ground → Rock = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Ground → Ghost = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ground → Dragon = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ground → Dark = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ground → Steel = super-effective" className="type-fx-cell type-fx-200">2</td> </tr>
              <tr>
                <th><Link className="type-icon type-flying type-cell" to={`${match.url}/${GetSafeName("flying")}`}>Flying</Link></th>
                <td title="Flying → Normal = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Flying → Fire = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Flying → Water = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Flying → Electric = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Flying → Grass = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Flying → Ice = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Flying → Fighting = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Flying → Poison = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Flying → Ground = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Flying → Flying = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Flying → Psychic = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Flying → Bug = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Flying → Rock = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Flying → Ghost = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Flying → Dragon = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Flying → Dark = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Flying → Steel = not very effective" className="type-fx-cell type-fx-50">½</td> </tr>
              <tr>
                <th><Link className="type-icon type-psychic type-cell" to={`${match.url}/${GetSafeName("psychic")}`}>Psychic</Link></th>
                <td title="Psychic → Normal = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Psychic → Fire = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Psychic → Water = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Psychic → Electric = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Psychic → Grass = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Psychic → Ice = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Psychic → Fighting = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Psychic → Poison = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Psychic → Ground = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Psychic → Flying = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Psychic → Psychic = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Psychic → Bug = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Psychic → Rock = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Psychic → Ghost = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Psychic → Dragon = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Psychic → Dark = no effect" className="type-fx-cell type-fx-0">0</td> <td title="Psychic → Steel = not very effective" className="type-fx-cell type-fx-50">½</td> </tr>
              <tr>
                <th><Link className="type-icon type-bug type-cell" to={`${match.url}/${GetSafeName("bug")}`}>Bug</Link></th>
                <td title="Bug → Normal = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Bug → Fire = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Bug → Water = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Bug → Electric = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Bug → Grass = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Bug → Ice = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Bug → Fighting = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Bug → Poison = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Bug → Ground = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Bug → Flying = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Bug → Psychic = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Bug → Bug = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Bug → Rock = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Bug → Ghost = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Bug → Dragon = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Bug → Dark = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Bug → Steel = not very effective" className="type-fx-cell type-fx-50">½</td> </tr>
              <tr>
                <th><Link className="type-icon type-rock type-cell" to={`${match.url}/${GetSafeName("rock")}`}>Rock</Link></th>
                <td title="Rock → Normal = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Rock → Fire = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Rock → Water = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Rock → Electric = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Rock → Grass = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Rock → Ice = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Rock → Fighting = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Rock → Poison = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Rock → Ground = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Rock → Flying = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Rock → Psychic = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Rock → Bug = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Rock → Rock = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Rock → Ghost = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Rock → Dragon = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Rock → Dark = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Rock → Steel = not very effective" className="type-fx-cell type-fx-50">½</td> </tr>
              <tr>
                <th><Link className="type-icon type-ghost type-cell" to={`${match.url}/${GetSafeName("ghost")}`}>Ghost</Link></th>
                <td title="Ghost → Normal = no effect" className="type-fx-cell type-fx-0">0</td> <td title="Ghost → Fire = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ghost → Water = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ghost → Electric = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ghost → Grass = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ghost → Ice = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ghost → Fighting = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ghost → Poison = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ghost → Ground = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ghost → Flying = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ghost → Psychic = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Ghost → Bug = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ghost → Rock = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ghost → Ghost = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Ghost → Dragon = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Ghost → Dark = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Ghost → Steel = not very effective" className="type-fx-cell type-fx-50">½</td> </tr>
              <tr>
                <th><Link className="type-icon type-dragon type-cell" to={`${match.url}/${GetSafeName("dragon")}`}>Dragon</Link></th>
                <td title="Dragon → Normal = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dragon → Fire = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dragon → Water = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dragon → Electric = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dragon → Grass = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dragon → Ice = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dragon → Fighting = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dragon → Poison = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dragon → Ground = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dragon → Flying = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dragon → Psychic = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dragon → Bug = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dragon → Rock = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dragon → Ghost = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dragon → Dragon = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Dragon → Dark = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dragon → Steel = not very effective" className="type-fx-cell type-fx-50">½</td> </tr>
              <tr>
                <th><Link className="type-icon type-dark type-cell" to={`${match.url}/${GetSafeName("dark")}`}>Dark</Link></th>
                <td title="Dark → Normal = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dark → Fire = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dark → Water = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dark → Electric = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dark → Grass = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dark → Ice = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dark → Fighting = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Dark → Poison = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dark → Ground = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dark → Flying = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dark → Psychic = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Dark → Bug = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dark → Rock = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dark → Ghost = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Dark → Dragon = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Dark → Dark = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Dark → Steel = not very effective" className="type-fx-cell type-fx-50">½</td> </tr>
              <tr>
                <th><Link className="type-icon type-steel type-cell" to={`${match.url}/${GetSafeName("steel")}`}>Steel</Link></th>
                <td title="Steel → Normal = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Steel → Fire = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Steel → Water = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Steel → Electric = not very effective" className="type-fx-cell type-fx-50">½</td> <td title="Steel → Grass = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Steel → Ice = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Steel → Fighting = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Steel → Poison = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Steel → Ground = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Steel → Flying = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Steel → Psychic = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Steel → Bug = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Steel → Rock = super-effective" className="type-fx-cell type-fx-200">2</td> <td title="Steel → Ghost = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Steel → Dragon = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Steel → Dark = normal effectiveness" className="type-fx-cell type-fx-100"></td> <td title="Steel → Steel = not very effective" className="type-fx-cell type-fx-50">½</td> </tr>
            </tbody>
          </table>
        </Route>
      </Switch>
    </div>
  );
}

export default Types;

function TypeView() {
  window.scrollTo(0, 0)
  let { name } = useParams<{ name: string }>();
  name = name.charAt(0).toUpperCase() + name.slice(1);
  const attackerGood:any[] = []
  const attackerBad:any[] = []
  const attackerImpossible:any[] = []
  const defenderWeakness:any[] = []
  const defenderResistance:any[] = []
  const defenderImmune:any[] = []
  Data.Types.forEach((defenderType) => {
    const defenderTypeName = defenderType.Type.charAt(0).toUpperCase() + defenderType.Type.slice(1)
    //@ts-ignore
    const multi:number = Data.Types.find(t => GetSafeName(t.Type) === GetSafeName(name))[GetSafeName(defenderType.Type)] 
    if(multi == 2) {
      attackerGood.push(defenderTypeName)
    } else if(multi == 0.5) {
      attackerBad.push(defenderTypeName)
    } else if(multi == 0) {
      attackerImpossible.push(defenderTypeName)
    }
  })
  Data.Types.forEach((attackerType) => {
    const attackerTypeName =  attackerType.Type.charAt(0).toUpperCase() + attackerType.Type.slice(1)
    //@ts-ignore
    const multi:number = attackerType[GetSafeName(name)]
    if(multi == 2) {
      defenderWeakness.push(attackerTypeName)
    } else if(multi == 0.5) {
      defenderResistance.push(attackerTypeName)
    } else if(multi == 0) {
      defenderImmune.push(attackerTypeName)
    }
  })
  return (
    <div style={{display:'flex', flexDirection:'column'}}>
      <div>
      <span className={`Type-Name type-icon-big type-${GetSafeName(name)}`}>{name}</span>
      </div>
      <div>
        <div className="Type-Effectiveness-Header">As an Attacker:</div>
        <div className="types-comparison-line-item">
          <span  className="Type-Comparison-Title">{`Super Effective against:`}</span>
              { attackerGood.map((type)=>{
                return <Link className={`Pokemon-Types type-icon-slim type-${GetSafeName(type)} Type-Comparison-Type`} 
                to={`../types/${GetSafeName(type)}`}>{type}</Link>
              })}
          </div>
        <div className="types-comparison-line-item">
          <span  className="Type-Comparison-Title">{`Not Very Effective against:`}</span>
              { attackerBad.map((type)=>{
                return <Link className={`Pokemon-Types type-icon-slim type-${GetSafeName(type)} Type-Comparison-Type`} 
                to={`../types/${GetSafeName(type)}`}>{type}</Link>
              })}
          </div>
        { attackerImpossible.length > 0 &&
          <div className="types-comparison-line-item">
            <span  className="Type-Comparison-Title">{`Can't Damage:`}</span>
              { attackerImpossible.map((type)=>{
                return <Link className={`Pokemon-Types type-icon-slim type-${GetSafeName(type)} Type-Comparison-Type`} 
                to={`../types/${GetSafeName(type)}`}>{type}</Link>
              })}
          </div>
        }
        <div className="Type-Effectiveness-Header">As a Defender:</div>
        <div className="types-comparison-line-item">
          <span  className="Type-Comparison-Title">{`Weak to:`}</span>
              { defenderWeakness.map((type)=>{
                return <Link className={`Pokemon-Types type-icon-slim type-${GetSafeName(type)} Type-Comparison-Type`} 
                to={`../types/${GetSafeName(type)}`}>{type}</Link>
              })}
          </div>
        <div className="types-comparison-line-item">
          <span  className="Type-Comparison-Title">{`Resistant to:`}</span>
              { defenderResistance.map((type)=>{
                return <Link className={`Pokemon-Types type-icon-slim type-${GetSafeName(type)} Type-Comparison-Type`} 
                to={`../types/${GetSafeName(type)}`}>{type}</Link>
              })}
          </div>
        { defenderImmune.length > 0 &&
          <div className="types-comparison-line-item">
            <span  className="Type-Comparison-Title">{`Immune to:`}</span>
              { defenderImmune.map((type)=>{
                return <Link className={`Pokemon-Types type-icon-slim type-${GetSafeName(type)} Type-Comparison-Type`} 
                to={`../types/${GetSafeName(type)}`}>{type}</Link>
              })}
          </div>
        }
      </div>
      <div className="Side-by-Side">
        <div className="Column-Container">
          <span className="Type-Pokemon-List-Header">Pokemon with this Type:</span>
          { Data.Pokemon.filter((p)=>{ return p.Types.includes(name)}).map((pokemon)=>{
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
        <div className="Column-Container">
          <span className="Type-Moves-List-Header">Moves of this Type:</span>
          { Data.Moves.filter((m)=>{ return m.Type.includes(name)}).map((move)=>{
            return (
              <Link className="List-Item"
                to={`../moves/${GetSafeName(move.Name)}`}>
                {move.Name}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}