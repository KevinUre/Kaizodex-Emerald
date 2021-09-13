import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { GetLevelUpString, GetSafeName, PadNumber } from "../helpers"
import Data from '../DataContext'
import './Moves.css';

function Moves() {
  let match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:name`}>
          <MoveView />
        </Route>
        <Route path={`${match.path}`}>
          <div className="List-Container">
            {Data.Moves.sort((a,b)=>{
              if (a.Name<b.Name) {return -1;}
              else if (b.Name>a.Name) { return 1;}
              return 0;
            }).map((move) => {
              return (
                <Link className="List-Item"
                  to={`${match.url}/${GetSafeName(move.Name)}`}>
                  {move.Name}
                </Link>
              )
            })}
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default Moves;

function MoveView() {
  window.scrollTo(0, 0)
  let { name } = useParams<{ name: string }>();
  let Move = Data.Moves.find(m => GetSafeName(m.Name) === name);
  if (!Move) { Move = Data.Moves[0]; }
  const MoveName = `${Move.Name}`;
  return (
    <div className="Move-Container">
      <span className="Move-Name">{Move.Name}</span>
      <span className="Move-Description">{Move.Description}</span>
      <div>
        <span className="Move-Detail-Header">Power:</span>
        <span>{Move.Power}</span>
      </div>
      <div>
        <span className="Move-Detail-Header">Type:</span>
        <span>{Move.Type}</span>
      </div>
      <div>
        <span className="Move-Detail-Header">Category:</span>
        <span>{Move.Category}</span>
      </div>
      <div>
        <span className="Move-Detail-Header">Accuracy:</span>
        <span>{Move.Accuracy}</span>
      </div>
      <div>
        <span className="Move-Detail-Header">PP:</span>
        <span>{Move.PP}</span>
      </div>
      <div>
        <span className="Move-Detail-Header">Targets:</span>
        <span>{Move.Targets}</span>
      </div>
      <span className="Move-Pokemon-List-Header">Pokemon with this Move:</span>
      { Data.Pokemon.filter((p)=>{ 
        return p.Moves.filter((ms) => { return ms.Move === MoveName }).length > 0
      }).map((pokemon)=>{
        return (
          <Link className="List-Item"
            to={`../pokemon/${GetSafeName(pokemon.Name)}`}>
            {pokemon.Name}
          </Link>
        )
      })}
    </div>
  )
}