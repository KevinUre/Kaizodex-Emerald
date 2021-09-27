import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Data, { LearnedMove, Move, Pokemon } from '../DataContext';
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

function getMoves(pokemon:Pokemon):Move[] {
  if (!pokemon) { return [] }
  const pkmn = Data.Pokemon.find((p) => p.Name == pokemon.Name)
  if(!pkmn) {  return [] }
  const learnedMoves = [...pkmn.Moves]
  var moves = learnedMoves.map((lm) => {
    return Data.Moves.find(m => m.Name == lm.Move)
  })
  moves = moves.filter(e => e)
  const allOtherMoves = Data.Moves.sort((a,b)=>{
    const nameA = a.Name.toUpperCase()
    const nameB = b.Name.toUpperCase()
    if (nameA < nameB) { return -1; }
    if (nameA > nameB) { return 1; }
    return 0
  })
    .filter(m => !moves.includes(m))
  //@ts-ignore
  return moves.concat(allOtherMoves)
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

function getEffectivenessForMoveSetAgainstType(moveSet:Move[], type:string) {
  if(moveSet.length == 0) { return 100; }
  var best = 0;
  moveSet.forEach( move => {
    if(move) {
      if(parseInt(move.Power) > 0) {
        const moveTypeData = Data.Types.find(t => GetSafeName(t.Type) === GetSafeName(move.Type))
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

function MoveSetSelector() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [moveSets, setMoveSets] = useState<Move[]>([]);

  return (
    <div style={{display:'flex', flexDirection: 'column'}}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={Data.Pokemon}
        getOptionLabel={(pokemon) => pokemon.Name}
        //@ts-ignore
        onChange={(event,value) => {setPokemon(value)}}
        sx={{ width: 160 }}
        renderInput={(params) => <TextField variant="standard" {...params} label={`Pokemon`} />}
      />
      <Autocomplete
        multiple
        id="combo-box-demo"
        //@ts-ignore
        options={getMoves(pokemon)}
        getOptionLabel={(move) => move.Name}
        onChange={(event,value) => {setMoveSets(value)}}
        sx={{ width: 750 }}
        style={{marginTop: moveSetSpacing}}
        renderInput={(params) => <TextField variant="standard" {...params} label={`${pokemon?.Name}'s Moves`} />}
      />
      <table className="type-table Type-Table" style={{marginTop: tableSpacing, width: 'fit-content'}}>
        { getTypeTableHeader('As a Defender') }
        <tbody>
          { pokemon &&
            <tr>
              <th><Link style={{textDecoration: 'none', color: 'black'}} to={`../pokemon/${GetSafeName(pokemon.Name)}`}>{pokemon.Name}</Link></th>
              {
                Data.Types.map((type) => {
                  const effectiveness = getPokemonTankEffectivenessForType(pokemon,type.Type)
                  return (
                    <td className={`type-fx-cell type-fx-${getTankTableColor(effectiveness)}`}>{getTableIcon(effectiveness)}</td> 
                  )
                })
              }
            </tr>
          }
        </tbody>
      </table>
      <table className="type-table Type-Table" style={{marginTop: tableSpacing, width: 'fit-content'}}>
        { getTypeTableHeader('As an Attacker') }
        <tbody>
          { pokemon && moveSets && moveSets.length > 0 &&
            <tr>
              <th><Link style={{textDecoration: 'none', color: 'black'}} to={`../pokemon/${GetSafeName(pokemon.Name)}`}>{pokemon.Name}</Link></th>
              {
                Data.Types.map((type) => {
                  const effectiveness = getEffectivenessForMoveSetAgainstType(moveSets,type.Type)
                  return (
                    <td className={`type-fx-cell type-fx-${effectiveness}`}>{getTableIcon(effectiveness)}</td> 
                  )
                })
              }
            </tr>
          }
        </tbody>
      </table>
      {/* <TextField size="small" label="Session Hash" style={{marginTop:'1rem'}}/> */}
    </div>
  )
}

export default MoveSetSelector
