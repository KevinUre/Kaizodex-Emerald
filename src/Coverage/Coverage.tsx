import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Data, { LearnedMove, Pokemon } from '../DataContext';
import { useState } from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { GetSafeName } from '../helpers';
import '../Types/Types.css';

function getMoves(pokemon:Pokemon):LearnedMove[] {
  if (!pokemon) { return [] }
  const pkmn = Data.Pokemon.find((p) => p.Name == pokemon.Name)
  if(!pkmn) {  return [] }
  return pkmn.Moves
}

function getPokemonTankEffectivenessForType(pokemon:Pokemon, type:string) {
  var aggregate = 1;
  pokemon.Types.forEach(defenderType => {
    const typeData = Data.Types.find(t => GetSafeName(t.Type) === GetSafeName(type))
    if (typeData) {
      //@ts-ignore
      aggregate *= typeData[GetSafeName(defenderType)]
    }
  })
  return aggregate * 100;
}

function getEffectivenessForMoveSetAgainstType(moveset:LearnedMove[], type:string) {
  if(moveset.length == 0) { return 100; }
  var best = 0;
  moveset.forEach( setMove => {
    const moveData = Data.Moves.find(m => m.Name == setMove.Move)
    if(moveData) {
      if(parseInt(moveData.Power) > 0) {
        const moveTypeData = Data.Types.find(t => GetSafeName(t.Type) === GetSafeName(moveData.Type))
        if(moveTypeData) {
          //@ts-ignore
          if (moveTypeData[GetSafeName(type)] > best) {
            //@ts-ignore
            best = moveTypeData[GetSafeName(type)]
          }
        }
      }
    }
  })
  return best * 100;
}

function getTableIcon(effectiveness:any) {
  switch(effectiveness) {
    case 0:
      return '0';
    case 25:
      return '¼';
    case 50:
      return '½';
    case 100:
      return '';
    case 200:
      return '2';
    case 400:
      return '4';
    default:
      return '';
  } 
}

function getTankTableColor(effectiveness:any) {
  switch(effectiveness) {
    case 0:
      return 0;
    case 25:
      return 400;
    case 50:
      return 200;
    case 100:
      return 100;
    case 200:
      return 50;
    case 400:
      return 25;
    default:
      return 100;
  } 
}

function getTypeTableHeader(cornerTitle: string) {
  return (
    <thead>
      <tr>
        <th style={{width: '170px'}}>{cornerTitle}</th>
        <th><Link className="type-icon type-normal type-cell type-abbr" to={`../types/${GetSafeName("normal")}`} title="Normal">Nor</Link></th>
        <th><Link className="type-icon type-fire type-cell type-abbr" to={`../types/${GetSafeName("fire")}`} title="Fire">Fir</Link></th>
        <th><Link className="type-icon type-water type-cell type-abbr" to={`../types/${GetSafeName("water")}`} title="Water">Wat</Link></th>
        <th><Link className="type-icon type-electric type-cell type-abbr" to={`../types/${GetSafeName("electric")}`} title="Electric">Ele</Link></th>
        <th><Link className="type-icon type-grass type-cell type-abbr" to={`../types/${GetSafeName("grass")}`} title="Grass">Gra</Link></th>
        <th><Link className="type-icon type-ice type-cell type-abbr" to={`../types/${GetSafeName("ice")}`} title="Ice">Ice</Link></th>
        <th><Link className="type-icon type-fighting type-cell type-abbr" to={`../types/${GetSafeName("fighting")}`} title="Fighting">Fig</Link></th>
        <th><Link className="type-icon type-poison type-cell type-abbr" to={`../types/${GetSafeName("poison")}`} title="Poison">Poi</Link></th>
        <th><Link className="type-icon type-ground type-cell type-abbr" to={`../types/${GetSafeName("ground")}`} title="Ground">Gro</Link></th>
        <th><Link className="type-icon type-flying type-cell type-abbr" to={`../types/${GetSafeName("flying")}`} title="Flying">Fly</Link></th>
        <th><Link className="type-icon type-psychic type-cell type-abbr" to={`../types/${GetSafeName("psychic")}`} title="Psychic">Psy</Link></th>
        <th><Link className="type-icon type-bug type-cell type-abbr" to={`../types/${GetSafeName("bug")}`} title="Bug">Bug</Link></th>
        <th><Link className="type-icon type-rock type-cell type-abbr" to={`../types/${GetSafeName("rock")}`} title="Rock">Roc</Link></th>
        <th><Link className="type-icon type-ghost type-cell type-abbr" to={`../types/${GetSafeName("ghost")}`} title="Ghost">Gho</Link></th>
        <th><Link className="type-icon type-dragon type-cell type-abbr" to={`../types/${GetSafeName("dragon")}`} title="Dragon">Dra</Link></th>
        <th><Link className="type-icon type-dark type-cell type-abbr" to={`../types/${GetSafeName("dark")}`} title="Dark">Dar</Link></th>
        <th><Link className="type-icon type-steel type-cell type-abbr" to={`../types/${GetSafeName("steel")}`} title="Steel">Ste</Link></th>
      </tr>
    </thead>
  )
}



const pokemonSpacing = '1rem'
const tableSpacing = '2rem'
const moveSetSpacing = '0.5rem'

function Coverage() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [moveSets, setMoveSets] = useState<LearnedMove[][]>([]);

  const safePokemonSet = (index: number, newValue: any) => {
    var newState = [...pokemon]
    newState[index] = newValue
    setPokemon(newState);
  }

  const safeMoveSetSet = (index: number, newValue: LearnedMove[]) => {
    var newState = [...moveSets]
    newState[index] = newValue
    setMoveSets(newState);
  }

  const shouldShowPokemonSelector = (index: number) => {
    if (index == 0) { return true; }
    if (!pokemon) { return false; }
    for(var i = 0; i < index; i++) {
      if (!pokemon[i]) { return false; }
    }
    return true;
  }

  const shouldShowMoveSelector = (index: number) => {
    return pokemon && pokemon[index]
  }

  return (
    <div style={{display:'flex', flexDirection: 'column'}}>
      {
        [...Array(6)].map((imUndefined, index) => {
          if (shouldShowPokemonSelector(index)) {
            return (
              <div style={{marginBottom: pokemonSpacing, marginTop: pokemonSpacing}}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={Data.Pokemon}
                  getOptionLabel={(pokemon) => pokemon.Name}
                  onChange={(event,value) => {safePokemonSet(index,value)}}
                  sx={{ width: 160 }}
                  renderInput={(params) => <TextField variant="standard" {...params} label={`Pokemon ${index+1}`} />}
                />
                { shouldShowMoveSelector(index) &&
                  <Autocomplete
                    multiple
                    id="combo-box-demo"
                    options={getMoves(pokemon[index])}
                    getOptionLabel={(move) => move.Move}
                    onChange={(event,value) => {safeMoveSetSet(index,value)}}
                    sx={{ width: 750 }}
                    style={{marginTop: moveSetSpacing}}
                    renderInput={(params) => <TextField variant="standard" {...params} label={`${pokemon[index].Name}'s Moves`} />}
                  />
                }
              </div>
            )
          }
        })
      }
      <table className="type-table Type-Table" style={{marginTop: tableSpacing, width: 'fit-content'}}>
        { getTypeTableHeader('As a Defender') }
        <tbody>
          {
            [...Array(6)].map((imUndefined, index) => {
              if (pokemon && pokemon[index]) {
                return (
                  <tr>
                    <th><Link style={{textDecoration: 'none', color: 'black'}} to={`../pokemon/${GetSafeName(pokemon[index].Name)}`}>{pokemon[index].Name}</Link></th>
                    {
                      Data.Types.map((type) => {
                        const effectiveness = getPokemonTankEffectivenessForType(pokemon[index],type.Type)
                        return (
                          <td className={`type-fx-cell type-fx-${getTankTableColor(effectiveness)}`}>{getTableIcon(effectiveness)}</td> 
                        )
                      })
                    }
                  </tr>
                )
              }
            })
          }
        </tbody>
      </table>
      <table className="type-table Type-Table" style={{marginTop: tableSpacing, width: 'fit-content'}}>
        { getTypeTableHeader('As an Attacker') }
        <tbody>
          {
            [...Array(6)].map((imUndefined, index) => {
              if (pokemon && pokemon[index] && moveSets && moveSets[index] && moveSets[index].length > 0) {
                return (
                  <tr>
                    <th><Link style={{textDecoration: 'none', color: 'black'}} to={`../pokemon/${GetSafeName(pokemon[index].Name)}`}>{pokemon[index].Name}</Link></th>
                    {
                      Data.Types.map((type) => {
                        const effectiveness = getEffectivenessForMoveSetAgainstType(moveSets[index],type.Type)
                        return (
                          <td className={`type-fx-cell type-fx-${effectiveness}`}>{getTableIcon(effectiveness)}</td> 
                        )
                      })
                    }
                  </tr>
                )
              }
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Coverage
