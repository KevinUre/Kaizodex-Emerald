import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { GetLevelUpString, GetNextPokemonSafe, GetParentLocationSafe, GetPokemonSafe, GetPreviousPokemonSafe, GetSafeName, PadNumber } from "../helpers"
import Data from '../DataContext'
import './Pokemon.css';
import HoverMaster from "../Hover/HoverMaster";
import Trigger from "../Hover/Trigger";
import Hover from "../Hover/Hover";


function Pokemon() {
  let match = useRouteMatch();
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
                    <div className="Pokemon-Line-Item">
                      <span className="Pokemon-Line-Item-Text">{PadNumber(pokemon.Number)}</span>
                      <img src={`./sprites/${PadNumber(pokemon.Number)}.png`} className="Pokemon-Sprite"/>
                      <span className="Pokemon-Line-Item-Text">{pokemon.Name}</span>
                    </div>
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
  window.scrollTo(0, 0)
  let { name } = useParams<{ name: string }>();
  let Pokemon = Data.Pokemon.find(p => GetSafeName(p.Name) === name);
  if (!Pokemon) { Pokemon = Data.Pokemon[0]; }
  const fourXNotEffective: any[] = [];
  const notEffective: any[] = [];
  const weakness: any[] = [];
  const fourXWeakness: any[] = [];
  const immunity: any[] = [];
  Data.Types.forEach(attackerType => {
    let multiplier:number = 1;
    Pokemon?.Types.forEach((defenderType) => {
      // @ts-ignore
      multiplier *= attackerType[GetSafeName(defenderType)]
    })
    const attackerTypeName =  attackerType.Type.charAt(0).toUpperCase() + attackerType.Type.slice(1)
    if(multiplier == 0.25) {
      fourXNotEffective.push(attackerTypeName);
    } else if (multiplier == 0.5) {
      notEffective.push(attackerTypeName);
    } else if (multiplier == 2) {
      weakness.push(attackerTypeName);
    } else if (multiplier == 4) {
      fourXWeakness.push(attackerTypeName);
    } else if (multiplier == 0) {
      immunity.push(attackerTypeName);
    }
  })
  console.log(JSON.stringify(weakness))
  console.log(JSON.stringify(notEffective))
  return (
    <div className="Pokemon-Container">
      <div className="Pokemon-Nav-Container">
        <Link className="Evolution-Link Pokemon-Arrow-Container"
          to={`${GetSafeName(GetPreviousPokemonSafe(name).Name)}`}>
          <div className="Pokemon-Line-Item">
            <span className="Pokemon-Line-Item-Text Pokemon-Arrow">🠜</span>
            <img src={`/sprites/${PadNumber(GetPreviousPokemonSafe(name).Number)}.png`} className="Pokemon-Sprite"/>
            <span className="Pokemon-Line-Item-Text">{GetPreviousPokemonSafe(name).Name}</span>
          </div>
        </Link>
        <Link className="Evolution-Link Pokemon-Arrow-Container"
          to={`${GetSafeName(GetNextPokemonSafe(name).Name)}`}>
          <div className="Pokemon-Line-Item">
            <span className="Pokemon-Line-Item-Text">{GetNextPokemonSafe(name).Name}</span>
            <img src={`/sprites/${PadNumber(GetNextPokemonSafe(name).Number)}.png`} className="Pokemon-Sprite"/>
            <span className="Pokemon-Line-Item-Text Pokemon-Arrow">🠞</span>
          </div>
        </Link>
      </div>
      <div className="Pokemon-Nav-Container pad-bottom-one-rem">
        <span className="Pokemon-Name">{Pokemon.Name}</span>
        <span className="Pokemon-Number">{`(#${PadNumber(Pokemon.Number)})`}</span>
      </div>
      <img className="Pokemon-Image" src={`/images/${PadNumber(Pokemon.Number)}.png`}></img>
      { Pokemon.EvolvesFrom &&
        <div className="Flex-Column-Item Pokemon-Line-Item">
          <span>Evolves From:</span>
          <Link className="Evolution-Link"
            to={`${GetSafeName(Pokemon.EvolvesFrom.From)}`}>
            <div className="Pokemon-Line-Item">
              <img src={`/sprites/${PadNumber(GetPokemonSafe(Pokemon.EvolvesFrom.From).Number)}.png`} className="Pokemon-Sprite"/>
              <span className="Pokemon-Line-Item-Text">{Pokemon.EvolvesFrom.From}</span>
            </div>
          </Link>
          <span className="Evolution-Method">{`(${GetLevelUpString(Pokemon.EvolvesFrom)})`}</span>
        </div>
      }
      { Pokemon.EvolvesInto && Pokemon.EvolvesInto.length == 1 &&
        <div className="Flex-Column-Item Pokemon-Line-Item">
        <span>Evolves Into:</span>
        <Link className="Evolution-Link"
          to={`${GetSafeName(Pokemon.EvolvesInto[0].Into)}`}>
          <div className="Pokemon-Line-Item">
            <img src={`/sprites/${PadNumber(GetPokemonSafe(Pokemon.EvolvesInto[0].Into).Number)}.png`} className="Pokemon-Sprite"/>
            <span className="Pokemon-Line-Item-Text">{Pokemon.EvolvesInto[0].Into}</span>
          </div>
        </Link>
        <span className="Evolution-Method">{`(${GetLevelUpString(Pokemon.EvolvesInto[0])})`}</span>
      </div>
      }
      { Pokemon.EvolvesInto && Pokemon.EvolvesInto.length > 1 &&
        <div className="Flex-Column-Item ">
          <span>Evolves Into:</span>
          <div>
            { Pokemon.EvolvesInto.map((evolution => {
              return (
              <div className="Pokemon-Line-Item">
                  <Link className="Evolution-Link Evolution-Pokemon"
                    to={`${GetSafeName(evolution.Into)}`}>
                    <div className="Pokemon-Line-Item">
                      <img src={`/sprites/${PadNumber(GetPokemonSafe(evolution.Into).Number)}.png`} className="Pokemon-Sprite"/>
                      <span className="Pokemon-Line-Item-Text">{evolution.Into}</span>
                    </div>
                  </Link>
                  <span className="Evolution-Method">{`(${GetLevelUpString(evolution)})`}</span>
                </div>
              )
            }))}
          </div>
        </div>
      }
      <div className="Flex-Column-Item">
        <span>{Pokemon.Types.length > 1 ? `Types:` : `Type`}</span>
          { Pokemon.Types.map((type)=>{
            return <Link className={`Pokemon-Types type-icon-slim type-${GetSafeName(type)}`} 
            to={`../types/${GetSafeName(type)}`}>{type}</Link>
          })}
      </div>
      <div className="Flex-Column-Item">
        <span>Stats:</span>
        <div className="Stats-Grid">
          <span className="Stat-Type">HP</span>
          <span className="Stat">{Pokemon.Stats.HP}</span>
          <span className="Stat-Type">Attack</span>
          <span className="Stat">{Pokemon.Stats.Attack}</span>
          <span className="Stat-Type">Sp Atk</span>
          <span className="Stat">{Pokemon.Stats.SpecialAttack}</span>
          <span className="Stat-Type">Defense</span>
          <span className="Stat">{Pokemon.Stats.Defense}</span>
          <span className="Stat-Type">Sp Def</span>
          <span className="Stat">{Pokemon.Stats.SpecialDefense}</span>
          <span className="Stat-Type">Speed</span>
          <span className="Stat">{Pokemon.Stats.Speed}</span>
        </div>
      </div>
      <div className="Flex-Column-Item">
        <span>{Pokemon.Abilities.length > 1 ? `Abilities:` : `Ability`}</span>
          { Pokemon.Abilities.map((ability)=>{
            return <Link className="Pokemon-Abilities" to={`../abilities/${GetSafeName(ability)}`}>{ability}</Link>
          })}
      </div>
      { Pokemon.FoundAt.length > 0 &&
        <div className="Flex-Column-Item">
          <span>Found At: </span>
          { Pokemon.FoundAt.map((encounter) => {
            return (
              <div className="Location-Flex">
                <Link className="Location-Info" to={`../locations/${GetParentLocationSafe(encounter.Location)}`}>{encounter.Location}</Link>
                <span className="Location-Details">{`(${encounter.Type})`}</span>
              </div>
            )
          })}
        </div>
      }
      <div className="Flex-Column-Item">
        <span>Moves:</span>
        <table className="Pokemon-Move-Table">
          { Pokemon.Moves.map((move, index)=>{
            return (
              <tr key={index} className="Pokemon-Move-Row">
                <td>
                  {/* <HoverMaster options={{followCursor: true, shiftX:0, shiftY:0}}>
                    <Trigger type="trigger">
                      <Link className="Pokemon-Move-Name" to={`../moves/${GetSafeName(move.Move)}`}>{move.Move}</Link>
                    </Trigger>
                    <Hover type="hover">
                      <img className="Pokemon-Image" src={`/images/001.png`}></img>
                    </Hover>
                  </HoverMaster> */}
                  <Link className="Pokemon-Move-Name" to={`../moves/${GetSafeName(move.Move)}`}>{move.Move}</Link>
                </td>
                <td>{move.Level}</td>
              </tr>
            )
          })}
        </table>
      </div>
      <div className="Flex-Column-Item">
        <div className="Type-Effectiveness-Header">Type Effectiveness:</div>
        { fourXWeakness.length > 0 &&
          <div className="types-comparison-line-item">
          <span  className="Type-Comparison-Title">{`4x Weakness to:`}</span>
              { fourXWeakness.map((type)=>{
                return <Link className={`Pokemon-Types type-icon-slim type-${GetSafeName(type)} Type-Comparison-Type`} 
                to={`../types/${GetSafeName(type)}`}>{type}</Link>
              })}
          </div>
        }
        { weakness.length > 0 &&
          <div className="types-comparison-line-item">
            <span className="Type-Comparison-Title">{`Weak To:`}</span>
              { weakness.map((type)=>{
                return <Link className={`Pokemon-Types type-icon-slim type-${GetSafeName(type)} Type-Comparison-Type`} 
                to={`../types/${GetSafeName(type)}`}>{type}</Link>
              })}
          </div>
        }
        { notEffective.length > 0 &&
          <div className="types-comparison-line-item">
            <span className="Type-Comparison-Title">{`Resistant to:`}</span>
              { notEffective.map((type)=>{
                return <Link className={`Pokemon-Types type-icon-slim type-${GetSafeName(type)} Type-Comparison-Type`} 
                to={`../types/${GetSafeName(type)}`}>{type}</Link>
              })}
          </div>
        }
        { fourXNotEffective.length > 0 &&
          <div className="types-comparison-line-item">
            <span className="Type-Comparison-Title">{`4x Resistance to:`}</span>
              { fourXNotEffective.map((type)=>{
                return <Link className={`Pokemon-Types type-icon-slim type-${GetSafeName(type)} Type-Comparison-Type`} 
                to={`../types/${GetSafeName(type)}`}>{type}</Link>
              })}
          </div>
        }
        { immunity.length > 0 &&
          <div className="types-comparison-line-item">
            <span className="Type-Comparison-Title">{`Immune to:`}</span>
              { immunity.map((type)=>{
                return <Link className={`Pokemon-Types type-icon-slim type-${GetSafeName(type)} Type-Comparison-Type`} 
                to={`../types/${GetSafeName(type)}`}>{type}</Link>
              })}
          </div>
        }
      </div>
    </div>
  );
}